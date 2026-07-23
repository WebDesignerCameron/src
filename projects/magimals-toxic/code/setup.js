window.addEventListener("load", ()=>{
    let g=document.getElementById("guider");
    g.textContent="setup";
    // Load main menu
    let logo=document.createElement("div");
    logo.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <radialGradient id="darkBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#004400" />
      <stop offset="100%" stop-color="#0a430b" />
    </radialGradient>

    <linearGradient id="slimeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#9EF01A" />
      <stop offset="50%" stop-color="#70E000" />
      <stop offset="100%" stop-color="#38B000" />
    </linearGradient>
    <linearGradient id="slimeHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#CCFF33" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#70E000" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE259" />
      <stop offset="100%" stop-color="#FFA751" />
    </linearGradient>

    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0E0E0" />
      <stop offset="50%" stop-color="#888888" />
      <stop offset="100%" stop-color="#333333" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#darkBg)" />

  <g id="slime-background">
    <path d="M -10 -10 
             L 810 -10 
             L 810 250 
             Q 750 280, 710 370 
             Q 680 440, 640 280 
             Q 610 180, 560 320 
             Q 520 450, 480 490 
             Q 440 520, 410 350 
             Q 380 200, 340 310 
             Q 300 420, 260 460 
             Q 220 490, 190 320 
             Q 150 160, 110 290 
             Q 70 410, 40 330 
             Q 10 260, -10 280 Z" 
          fill="url(#slimeGrad)" />
          
    <path d="M -10 -10 L 810 -10 L 810 200 Q 700 240, 600 210 Q 500 180, 400 230 Q 250 250, 100 190 Q 30 220, -10 180 Z" fill="url(#slimeHighlight)" />

    <circle cx="480" cy="530" r="12" fill="#38B000" />
    <circle cx="480" cy="530" r="8" fill="#70E000" />
    
    <circle cx="260" cy="500" r="10" fill="#38B000" />
    <circle cx="260" cy="500" r="6" fill="#70E000" />
    
    <circle cx="710" cy="410" r="15" fill="#38B000" />
    <circle cx="710" cy="410" r="10" fill="#70E000" />
  </g>

  <g id="magimals-text" transform="translate(0, -20)">
    <path d="M 150 180 Q 250 80, 400 140 T 650 120" fill="none" stroke="#E0AA3E" stroke-width="4" opacity="0.6" filter="url(#glow)" />
    <path d="M 120 130 Q 300 220, 500 100 T 680 160" fill="none" stroke="#DA70D6" stroke-width="3" opacity="0.5" filter="url(#glow)" />

    <text x="400" y="168" font-family="'Cinzel', 'Georgia', serif" font-size="82" font-weight="bold" font-style="italic" text-anchor="middle" fill="#240046">MAGIMALS</text>
    <text x="400" y="166" font-family="'Cinzel', 'Georgia', serif" font-size="82" font-weight="bold" font-style="italic" text-anchor="middle" fill="#3C096C">MAGIMALS</text>
    <text x="400" y="164" font-family="'Cinzel', 'Georgia', serif" font-size="82" font-weight="bold" font-style="italic" text-anchor="middle" fill="#5A189A">MAGIMALS</text>
    <text x="400" y="162" font-family="'Cinzel', 'Georgia', serif" font-size="82" font-weight="bold" font-style="italic" text-anchor="middle" fill="#7B2CBF">MAGIMALS</text>
    <text x="400" y="160" font-family="'Cinzel', 'Georgia', serif" font-size="82" font-weight="bold" font-style="italic" text-anchor="middle" fill="#9D4EDD">MAGIMALS</text>

    <text x="400" y="156" font-family="'Cinzel', 'Georgia', serif" font-size="82" font-weight="bold" font-style="italic" text-anchor="middle" fill="url(#goldGrad)" filter="url(#glow)">MAGIMALS</text>
    <text x="400" y="156" font-family="'Cinzel', 'Georgia', serif" font-size="82" font-weight="bold" font-style="italic" text-anchor="middle" fill="#FFF" opacity="0.3">MAGIMALS</text>

    <path d="M 125 140 C 110 130, 100 150, 90 130 C 105 140, 115 120, 125 140 Z" fill="#FFE259" />
    <path d="M 675 140 C 690 130, 700 150, 710 130 C 695 140, 685 120, 675 140 Z" fill="#FFE259" />
  </g>

  <g id="toxic-text" transform="translate(0, 30)">
    <text x="175" y="450" font-family="'Impact', 'Arial Black', sans-serif" font-size="110" fill="#003500" stroke="#001500" stroke-width="4" letter-spacing="10">T</text>
    
    <text x="250" y="450" font-family="'Impact', 'Arial Black', sans-serif" font-size="110" fill="#003500" stroke="#001500" stroke-width="4" letter-spacing="10">O</text>

    <g id="ninja-star-x" transform="translate(355, 400)">
      <path d="M 0 -55 
               L 12 -12 
               L 55 0 
               L 12 12 
               L 0 55 
               L -12 12 
               L -55 0 
               L -12 -12 Z" 
            fill="url(#metalGrad)" stroke="#111" stroke-width="3" />
      <path d="M 0 -55 L 0 55 M -55 0 L 55 0" stroke="#555" stroke-width="1.5" />
      <circle cx="0" cy="0" r="10" fill="#0a0312" stroke="#111" stroke-width="3" />
      <polygon points="0,-55 -4,-12 0,0" fill="#FFF" opacity="0.4" />
      <polygon points="55,0 12,4 0,0" fill="#FFF" opacity="0.4" />
      <polygon points="0,55 4,12 0,0" fill="#FFF" opacity="0.4" />
      <polygon points="-55,0 -12,-4 0,0" fill="#FFF" opacity="0.4" />
    </g>

    <g id="barrel-i" transform="translate(455, 335)">
      <path d="M 10 20 Q 25 15, 40 20 L 45 100 Q 25 105, 5 100 Z" fill="#1b4314" stroke="#001500" stroke-width="4" />
      <ellipse cx="25" cy="20" rx="15" ry="6" fill="#2d6a1b" stroke="#001500" stroke-width="3" />
      <path d="M 8 45 Q 25 42, 42 45" fill="none" stroke="#001500" stroke-width="3" />
      <path d="M 6 75 Q 25 72, 44 75" fill="none" stroke="#001500" stroke-width="3" />
      <circle cx="25" cy="60" r="8" fill="#9EF01A" />
      <line x1="25" y1="52" x2="25" y2="68" stroke="#1b4314" stroke-width="2" />
      <line x1="17" y1="60" x2="33" y2="60" stroke="#1b4314" stroke-width="2" />
      <path d="M 25 -5 C 32 -5, 35 10, 25 15 C 15 10, 18 -5, 25 -5 Z" fill="#9EF01A" />
    </g>

    <text x="540" y="450" font-family="'Impact', 'Arial Black', sans-serif" font-size="110" fill="#003500" stroke="#001500" stroke-width="4" letter-spacing="10">C</text>
  </g>
</svg>`;
    logo.width=30;
    logo.class="over pos-50-65";
    let frame=document.getElementById("frame");
    frame.appendChild(logo);
})
