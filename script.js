const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-btn');
const links=document.querySelector('.nav-links');
function setScrolled(){header?.classList.toggle('scrolled',window.scrollY>20)}
setScrolled(); window.addEventListener('scroll',setScrolled,{passive:true});
menu?.addEventListener('click',()=>{const open=links?.classList.toggle('open');header?.classList.toggle('menu-active',!!open);document.body.classList.toggle('menu-open',!!open);menu.setAttribute('aria-expanded',open?'true':'false');menu.textContent=open?'×':'☰';});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');header?.classList.remove('menu-active');document.body.classList.remove('menu-open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰';}));

const galleryButtons=[...document.querySelectorAll('[data-lightbox]')];
const lightbox=document.querySelector('.lightbox'); const lightboxImg=lightbox?.querySelector('img'); const lightboxClose=lightbox?.querySelector('.lightbox-close');
function closeLightbox(){lightbox?.classList.remove('open');document.body.style.overflow='';}
galleryButtons.forEach(btn=>btn.addEventListener('click',()=>{if(!lightbox||!lightboxImg)return;lightboxImg.src=btn.dataset.lightbox;lightboxImg.alt=btn.querySelector('img')?.alt||'Nardouw image';lightbox.classList.add('open');document.body.style.overflow='hidden';}));
lightboxClose?.addEventListener('click',closeLightbox);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});

const form=document.querySelector('#enquiry-form');
if(form){
  const arrival=form.querySelector('#arrival');
  const departure=form.querySelector('#departure');
  const today=new Date().toISOString().split('T')[0];
  if(arrival) arrival.min=today;
  if(departure) departure.min=today;
  arrival?.addEventListener('change',()=>{
    if(departure){
      departure.min=arrival.value||today;
      if(departure.value&&departure.value<=arrival.value) departure.value='';
    }
  });
}
