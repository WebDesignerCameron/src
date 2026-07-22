window.addEventListener("load", ()=>{
    let g=document.getElementById("guider");
    g.textContent="setup";
    // Load main menu
    let logo=document.createElement("img");
    logo.src="../assets/Images/logo.jpg";
    logo.alt="Magimals Toxic Logo";
    logo.width=250;
    logo.height="auto";
    logo.className="over pos-50-12";
    let frame=document.getElementById("frame");
    frame.appendChild(logo);
})