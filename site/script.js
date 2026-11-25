(() => {
 const toggle=document.querySelector('.menu-toggle');
 const nav=document.querySelector('.nav-links');
 const setOpen=(open)=>{toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);if(!open)toggle.focus();};
 toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
 nav.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')setOpen(false)});
})();
