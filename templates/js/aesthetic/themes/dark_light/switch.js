window.addEventListener("load", ()=>{
  let h=document.getElementById("header");
  let m=document.getElementById("main");
  let f=document.getElementById("footer");
  let b=document.getElementById("dl_switch");
  b.addEventListener("click", ()=>{
    if(h.style.color=="black"){
      h.style.color="white";
      h.style.background="black";
      m.style.color="black";
      m.style.background="white";
      f.style.color="white";
      f.style.background="black";
    }else{
      h.style.color="black";
      h.style.background="white";
      m.style.color="white";
      m.style.background="black";
      f.style.color="black";
      f.style.background="white";
    } 
  });
});
