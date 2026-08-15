document.addEventListener("DOMContentLoaded",()=>{
  const saved=localStorage.getItem("weeklyReportsTheme");
  if(saved==="dark") document.body.classList.add("dark");
  const themeBtn=document.getElementById("themeBtn");
  if(themeBtn){
    const paint=()=>themeBtn.innerHTML=document.body.classList.contains("dark")
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    paint();
    themeBtn.addEventListener("click",()=>{
      document.body.classList.toggle("dark");
      localStorage.setItem("weeklyReportsTheme",document.body.classList.contains("dark")?"dark":"light");
      paint();
    });
  }
});
