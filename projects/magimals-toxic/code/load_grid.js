window.addEventListener("load",()=>{
    let container=document.getElementById("g_container");
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(200, 0.5vw)';
    container.style.gridTemplateRows = 'repeat(200, 0.5vw)';
    container.style.width = 'max-content';
    container.style.height = 'max-content';
    const gridSize = 200;
    const fragment = document.createDocumentFragment();
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const div = document.createElement('div');
        div.id = `pix-${x}-${y}`;
        div.style.width = '0.5vw';
        div.style.height = '0.5vw';
        div.style.boxSizing = 'border-box';
        div.style.backgroundColor = '#000';
        fragment.appendChild(div);
      }
    }
    container.appendChild(fragment);
    document.body.appendChild(container);
});