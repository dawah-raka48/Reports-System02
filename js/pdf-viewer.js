(function(){
function normalizePdfUrl(url){
  if(!url)return "";
  try{
    const u=new URL(url);
    let id=u.searchParams.get("id");
    const m=u.pathname.match(/\/file\/d\/([^/]+)/);
    if(!id&&m)id=m[1];
    if(id)return `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
    return url;
  }catch(e){return url}
}
function ensure(){
  if(document.getElementById("pdfViewerOverlay"))return;
  const o=document.createElement("div");
  o.id="pdfViewerOverlay";
  o.innerHTML='<div class="pdf-viewer"><div class="pdf-toolbar"><div class="pdf-toolbar-title"><i class="fa-solid fa-file-pdf"></i><span id="pdfViewerTitle">التقرير الأسبوعي</span></div><div class="pdf-toolbar-actions"><button id="pdfExternal" class="pdf-toolbar-btn" title="فتح التقرير"><i class="fa-solid fa-up-right-from-square"></i></button><button id="pdfClose" class="pdf-toolbar-btn" title="إغلاق"><i class="fa-solid fa-xmark"></i></button></div></div><div class="pdf-frame-wrap"><div id="pdfLoading" class="pdf-loading"><i class="fa-solid fa-spinner fa-spin"></i>&nbsp; جاري فتح التقرير...</div><iframe id="pdfFrame" class="pdf-frame" title="التقرير" allow="fullscreen"></iframe></div></div>';
  document.body.appendChild(o);
  document.getElementById("pdfClose").onclick=close;
  document.getElementById("pdfExternal").onclick=()=>{const u=pdfFrame.dataset.originalUrl;if(u)window.open(u,"_blank","noopener,noreferrer")};
  o.onclick=e=>{if(e.target===o)close()};
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&o.classList.contains("show"))close()});
}
function open(url,title){
  if(!url)return;
  ensure();
  const viewerUrl=normalizePdfUrl(url);
  pdfViewerTitle.textContent=title||"التقرير الأسبوعي";
  pdfLoading.classList.remove("hide");
  pdfFrame.dataset.url=viewerUrl;
  pdfFrame.dataset.originalUrl=url;
  pdfFrame.src=viewerUrl;
  pdfFrame.onload=()=>pdfLoading.classList.add("hide");
  pdfViewerOverlay.classList.add("show");
  document.body.style.overflow="hidden";
}
function close(){
  const o=document.getElementById("pdfViewerOverlay");
  if(!o)return;
  o.classList.remove("show");
  document.body.style.overflow="";
  setTimeout(()=>{const f=document.getElementById("pdfFrame");if(f)f.src="about:blank"},180);
}
window.openPdfViewer=open;
window.closePdfViewer=close;
})();
