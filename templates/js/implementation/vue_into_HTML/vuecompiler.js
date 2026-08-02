const fs = require("fs");
const path = require("path");

/**
 * =================================================================
 * CUSTOM PUG ENGINE (Zero-Dependency)
 * =================================================================
 */
function parsePug(pugContent) {
    const lines = pugContent.split(/\r?\n/).filter(line => line.trim() !== "");
    let html = "";
    const stack = [];

    function getIndentation(line) {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
    }

    lines.forEach(line => {
        const indent = getIndentation(line);
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
            html += `</${stack.pop().tag}>`;
        }

        const lineRegex = /^([a-zA-Z0-9\-_]+)?(?:#([a-zA-Z0-9\-_]+))?(?:\.([a-zA-Z0-9\-._]+))?(?:\(([^)]*)\))?(.*)/;
        const match = trimmedLine.match(lineRegex);
        let tagName = match[1] || 'div';
        let id = match[2] || '';
        let classes = match[3] ? match[3].split('.').filter(c => c !== '') : [];
        let attrsString = match[4] || '';
        let content = match[5] ? match[5].trim() : '';

        let attributes = [];
        if (id) attributes.push(`id="${id}"`);
        if (classes.length > 0) attributes.push(`class="${classes.join(' ')}"`);

        if (attrsString) {
            const attrPairs = attrsString.match(/(?:[^\s"']+|["'][^"']*["'])+/g) || [];
            attrPairs.forEach(attr => {
                if (attr.includes('=')) {
                    let [key, val] = attr.split('=');
                    val = val.replace(/^['"]|['"]$/g, '');
                    attributes.push(`${key}="${val}"`);
                } else {
                    attributes.push(attr);
                }
            });
        }

        const allAttrs = attributes.length > 0 ? ' ' + attributes.join(' ') : '';
        html += `<${tagName}${allAttrs}>`;
        stack.push({ tag: tagName, indent: indent });
        if (content) html += content;
    });

    while (stack.length > 0) {
        html += `</${stack.pop().tag}>`;
    }
    return html;
}

/**
 * =================================================================
 * CUSTOM SCSS ENGINE (Zero-Dependency)
 * =================================================================
 */
function parseScss(scssContent) {
    let css = "";
    const variables = {};
    const mixins = {};

    function hexToRgb(hex) {
        hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function adjustColor(hex, percentage, type) {
        const rgb = hexToRgb(hex);
        if (!rgb) return hex;
        let { r, g, b } = rgb;
        const factor = percentage / 100;
        if (type === 'darken') {
            r = Math.max(0, r - Math.floor(r * factor));
            g = Math.max(0, g - Math.floor(g * factor));
            b = Math.max(0, b - Math.floor(b * factor));
        } else {
            r = Math.min(255, r + Math.floor((255 - r) * factor));
            g = Math.min(255, g + Math.floor((255 - g) * factor));
            b = Math.min(255, b + Math.floor((255 - b) * factor));
        }
        return rgbToHex(r, g, b);
    }

    let processed = scssContent.replace(/\$([a-zA-Z0-9\-_]+)\s*:\s*([^;]+);/g, (m, n, v) => {
        variables[`$${n}`] = v.trim();
        return "";
    }).replace(/@mixin\s+([a-zA-Z0-9\-_]+)\s*\{([\s\S]*?)\}/g, (m, n, b) => {
        mixins[n] = b.trim();
        return "";
    });

    const lines = processed.split(/\r?\n/);
    let stack = [], rules = [], indent = 0;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//')) return;
        const lineIndent = line.match(/^(\s*)/)[1].length;

        while (stack.length > 0 && lineIndent < indent) {
            stack.pop();
            indent -= 2;
        }

        if (trimmed === '}') {
            if (stack.length > 0) { stack.pop(); indent -= 2; }
            return;
        }

        const selMatch = trimmed.match(/^([^\{]+)\{$/);
        if (selMatch) {
            let sel = selMatch[1].trim();
            if (stack.length > 0) {
                const parent = stack[stack.length - 1];
                sel = sel.includes('&') ? sel.replace(/&/g, parent) : `${parent} ${sel}`;
            }
            stack.push(sel);
            indent = lineIndent + 2;
            return;
        }

        const incMatch = trimmed.match(/@include\s+([a-zA-Z0-9\-_]+);/);
        if (incMatch && mixins[incMatch[1]]) {
            mixins[incMatch[1]].split('\n').forEach(l => rules.push(`${' '.repeat(lineIndent + 2)}${l.trim()}`));
            return;
        }

        if (stack.length > 0 && trimmed.includes(':')) {
            const sel = stack[stack.length - 1];
            let [p, v] = trimmed.split(':').map(s => s.trim());
            for (const vn in variables) v = v.replace(new RegExp(`\\${vn}`, 'g'), variables[vn]);
            v = v.replace(/(darken|lighten)\(([^,]+),\s*(\d+)%\)/g, (m, f, c, per) => adjustColor(c.trim(), parseInt(per), f));
            rules.push(`${sel} { ${p}: ${v}; }`);
        }
    });

    const consolidated = {};
    rules.forEach(r => {
        const m = r.match(/^(.*?)\s*\{\s*(.*)\s*\}$/);
        if (m) {
            if (!consolidated[m[1].trim()]) consolidated[m[1].trim()] = [];
            consolidated[m[1].trim()].push(m[2].trim());
        }
    });

    for (const s in consolidated) css += `${s} { ${consolidated[s].join(' ')} }\n`;
    return css.trim();
}

/**
 * =================================================================
 * MAIN VUE TRANSPILER
 * =================================================================
 */
function transpileVue(input, output) {
    try {
        const content = fs.readFileSync(input, "utf8");
        const extract = (tag) => (content.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")) || ["", ""])[1].trim();
        const getLang = (tag) => (content.match(new RegExp(`<${tag}[^>]*lang=[""](.+?)[""][^>]*>`, "i")) || ["", "standard"])[1].toLowerCase();

        let template = extract("template"), script = extract("script"), style = extract("style");
        if (getLang("template") === "pug") template = parsePug(template);
        if (["scss", "sass"].includes(getLang("style"))) style = parseScss(style);

        const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Transpiled Vue</title><style>${style}</style></head><body><div id="app">${template}</div><script>${script}</script></body></html>`;
        fs.writeFileSync(output, html);
    } catch (e) {
        console.error("Error:", e.message);
    }
}

// Execution
const inputFile = path.join(__dirname, "App.vue");
const outputFile = path.join(__dirname, "App.html");
transpileVue(inputFile, outputFile);
