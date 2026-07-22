let cssContent = `#frame {
    position: relative;
    display: inline-block;
    width: 500px;
}
#frame .back {
    display: block;
}
#frame .over {
    position: absolute;
}
`;
for (let x = 1; x <= 100; x++) {
    for (let y = 1; y <= 100; y++) {
        cssContent += `.pos-${x}-${y} { top: ${y}%; left: ${x}%; transform: translate(-50%, -50%); }\n`;
    }
}
const style = document.createElement('style');
style.textContent = cssContent;
document.head.appendChild(style);