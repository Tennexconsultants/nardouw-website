const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-btn');
const links=document.querySelector('.nav-links');

function setScrolled(){
  header?.classList.toggle('scrolled',window.scrollY>20);
}

setScrolled();
window.addEventListener('scroll',setScrolled,{passive:true});

menu?.addEventListener('click',()=>{
  const open=links?.classList.toggle('open');
  header?.classList.toggle('menu-active',!!open);
  document.body.classList.toggle('menu-open',!!open);
  menu.setAttribute('aria-expanded',open?'true':'false');
  menu.textContent=open?'×':'☰';
});

links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  links.classList.remove('open');
  header?.classList.remove('menu-active');
  document.body.classList.remove('menu-open');
  menu?.setAttribute('aria-expanded','false');

  if(menu){
    menu.textContent='☰';
  }
}));


/* -------------------------------------------------------
   Gallery / lightbox setup
------------------------------------------------------- */

const pathname=window.location.pathname;

const isAccommodationPage=
  pathname.endsWith('/accommodation.html') ||
  pathname.endsWith('accommodation.html');

const isHomePage=
  pathname==='/' ||
  pathname.endsWith('/index.html') ||
  pathname.endsWith('index.html');


const accommodationGalleryItems=[
  ...document.querySelectorAll('[data-lightbox]')
];

const homeGalleryItems=[
  ...document.querySelectorAll('.home-mosaic img')
];

let pageGalleryItems=[];

if(isAccommodationPage){
  pageGalleryItems=accommodationGalleryItems;
}

if(isHomePage){
  pageGalleryItems=homeGalleryItems;
}


/* Create a lightbox automatically on the Home page */
let lightbox=document.querySelector('.lightbox');

if(!lightbox && isHomePage && pageGalleryItems.length){
  lightbox=document.createElement('div');
  lightbox.className='lightbox';
  lightbox.setAttribute('role','dialog');
  lightbox.setAttribute('aria-modal','true');

  lightbox.innerHTML=`
    <button
      type="button"
      aria-label="Close image"
      class="lightbox-close">×</button>
    <img alt="" src=""/>
  `;

  document.body.appendChild(lightbox);
}

const lightboxImg=lightbox?.querySelector('img');
const lightboxClose=lightbox?.querySelector('.lightbox-close');

let currentGalleryIndex=0;
let galleryModeOpen=false;
let touchStartX=0;
let touchEndX=0;

let previousButton=null;
let nextButton=null;


/* -------------------------------------------------------
   Gallery helpers
------------------------------------------------------- */

function getGalleryImage(item){
  if(!item){
    return null;
  }

  if(item.matches?.('img')){
    return item;
  }

  return item.querySelector?.('img')||null;
}

function getGallerySource(item){
  if(!item){
    return '';
  }

  if(item.dataset?.lightbox){
    return item.dataset.lightbox;
  }

  const image=getGalleryImage(item);

  return image?.currentSrc || image?.src || '';
}

function setGalleryControlsVisible(show){
  galleryModeOpen=show;

  if(previousButton){
    previousButton.hidden=!show;
  }

  if(nextButton){
    nextButton.hidden=!show;
  }
}

function closeLightbox(){
  lightbox?.classList.remove('open');
  document.body.style.overflow='';
  setGalleryControlsVisible(false);
}

function showGalleryImage(index){
  if(!lightbox||!lightboxImg||!pageGalleryItems.length){
    return;
  }

  if(index<0){
    index=pageGalleryItems.length-1;
  }

  if(index>=pageGalleryItems.length){
    index=0;
  }

  currentGalleryIndex=index;

  const item=pageGalleryItems[currentGalleryIndex];
  const image=getGalleryImage(item);

  lightboxImg.src=getGallerySource(item);
  lightboxImg.alt=image?.alt||'Nardouw image';
}

function openGalleryItem(item){
  if(!lightbox||!lightboxImg){
    return;
  }

  const galleryIndex=pageGalleryItems.indexOf(item);

  if(galleryIndex!==-1){
    currentGalleryIndex=galleryIndex;
    showGalleryImage(currentGalleryIndex);
    setGalleryControlsVisible(true);
  }
  else{
    const image=getGalleryImage(item);

    lightboxImg.src=getGallerySource(item);
    lightboxImg.alt=image?.alt||'Nardouw image';

    setGalleryControlsVisible(false);
  }

  lightbox.classList.add('open');
  document.body.style.overflow='hidden';
}


/* Existing lightbox items */
accommodationGalleryItems.forEach(item=>{
  item.addEventListener('click',()=>{
    openGalleryItem(item);
  });
});


/* Home-page mosaic */
homeGalleryItems.forEach(item=>{
  item.style.cursor='pointer';

  item.addEventListener('click',()=>{
    openGalleryItem(item);
  });
});


lightboxClose?.addEventListener('click',closeLightbox);

lightbox?.addEventListener('click',e=>{
  if(e.target===lightbox){
    closeLightbox();
  }
});


/* -------------------------------------------------------
   Home + Accommodation gallery controls
------------------------------------------------------- */

if(lightbox&&pageGalleryItems.length>1){

  const galleryStyle=document.createElement('style');

  galleryStyle.textContent=`

    .lightbox .lightbox-close{
      position:absolute !important;
      top:22px !important;
      right:22px !important;
      z-index:10003 !important;

      width:46px !important;
      height:46px !important;
      padding:0 !important;

      display:flex !important;
      align-items:center !important;
      justify-content:center !important;

      border:1px solid rgba(255,255,255,.35) !important;
      border-radius:50% !important;

      background:rgba(15,15,20,.58) !important;
      color:#fff !important;

      font-family:Arial,sans-serif !important;
      font-size:27px !important;
      font-weight:300 !important;
      line-height:1 !important;

      cursor:pointer !important;

      backdrop-filter:blur(8px);
      -webkit-backdrop-filter:blur(8px);

      box-shadow:0 6px 24px rgba(0,0,0,.18);

      transition:
        background .2s ease,
        border-color .2s ease,
        transform .2s ease !important;
    }

    .lightbox .lightbox-close:hover{
      background:rgba(242,107,33,.92) !important;
      border-color:#f26b21 !important;
      transform:scale(1.06);
    }


    .lightbox-gallery-arrow{
      position:absolute;
      top:50%;
      transform:translateY(-50%);
      z-index:10002;

      width:64px;
      height:88px;
      padding:0;

      display:flex;
      align-items:center;
      justify-content:center;

      border:0;
      border-radius:16px;

      background:rgba(10,10,14,.10);
      color:#fff;

      cursor:pointer;
      opacity:.82;

      backdrop-filter:blur(3px);
      -webkit-backdrop-filter:blur(3px);

      transition:
        background .2s ease,
        opacity .2s ease;
    }

    .lightbox-gallery-arrow[hidden]{
      display:none !important;
    }

    .lightbox-gallery-arrow svg{
      width:31px;
      height:31px;
      display:block;
      stroke:currentColor;
      filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));
    }

    .lightbox-gallery-arrow:hover{
      background:rgba(15,15,20,.58);
      color:#f26b21;
      opacity:1;
    }

    .lightbox-gallery-prev{
      left:18px;
    }

    .lightbox-gallery-next{
      right:18px;
    }


    /* Touch devices: swipe only */
    @media (hover:none), (pointer:coarse){

      .lightbox-gallery-arrow{
        display:none !important;
      }

      .lightbox .lightbox-close{
        top:14px !important;
        right:14px !important;

        width:38px !important;
        height:38px !important;

        border:0 !important;
        border-radius:12px !important;

        background:rgba(15,15,20,.58) !important;
        box-shadow:0 4px 16px rgba(0,0,0,.18) !important;

        font-size:0 !important;
      }

      .lightbox .lightbox-close::before,
      .lightbox .lightbox-close::after{
        content:'';
        position:absolute;

        width:17px;
        height:2px;

        background:#fff;
        border-radius:2px;

        top:50%;
        left:50%;
      }

      .lightbox .lightbox-close::before{
        transform:translate(-50%,-50%) rotate(45deg);
      }

      .lightbox .lightbox-close::after{
        transform:translate(-50%,-50%) rotate(-45deg);
      }
    }

    @media(max-width:700px){
      .lightbox-gallery-arrow{
        display:none !important;
      }
    }
  `;

  document.head.appendChild(galleryStyle);


  previousButton=document.createElement('button');
  previousButton.type='button';
  previousButton.className='lightbox-gallery-arrow lightbox-gallery-prev';
  previousButton.setAttribute('aria-label','Previous photo');

  previousButton.innerHTML=`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 5L8 12L15 19"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;


  nextButton=document.createElement('button');
  nextButton.type='button';
  nextButton.className='lightbox-gallery-arrow lightbox-gallery-next';
  nextButton.setAttribute('aria-label','Next photo');

  nextButton.innerHTML=`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;


  lightbox.appendChild(previousButton);
  lightbox.appendChild(nextButton);


  previousButton.addEventListener('click',e=>{
    e.stopPropagation();

    if(galleryModeOpen){
      showGalleryImage(currentGalleryIndex-1);
    }
  });


  nextButton.addEventListener('click',e=>{
    e.stopPropagation();

    if(galleryModeOpen){
      showGalleryImage(currentGalleryIndex+1);
    }
  });


  lightbox.addEventListener('touchstart',e=>{
    if(!galleryModeOpen){
      return;
    }

    touchStartX=e.changedTouches[0].clientX;
  },{
    passive:true
  });


  lightbox.addEventListener('touchend',e=>{
    if(!galleryModeOpen){
      return;
    }

    touchEndX=e.changedTouches[0].clientX;

    const swipeDistance=touchEndX-touchStartX;

    if(Math.abs(swipeDistance)<50){
      return;
    }

    if(swipeDistance<0){
      showGalleryImage(currentGalleryIndex+1);
    }
    else{
      showGalleryImage(currentGalleryIndex-1);
    }
  },{
    passive:true
  });
}


/* -------------------------------------------------------
   Keyboard controls
------------------------------------------------------- */

document.addEventListener('keydown',e=>{

  if(e.key==='Escape'){
    closeLightbox();
    return;
  }

  if(
    !galleryModeOpen ||
    !lightbox?.classList.contains('open')
  ){
    return;
  }

  if(e.key==='ArrowLeft'){
    e.preventDefault();
    showGalleryImage(currentGalleryIndex-1);
  }

  if(e.key==='ArrowRight'){
    e.preventDefault();
    showGalleryImage(currentGalleryIndex+1);
  }
});


/* -------------------------------------------------------
   Enquiry form
------------------------------------------------------- */

const form=document.querySelector('#enquiry-form');

if(form){
  const arrival=form.querySelector('#arrival');
  const departure=form.querySelector('#departure');
  const today=new Date().toISOString().split('T')[0];

  if(arrival){
    arrival.min=today;
  }

  if(departure){
    departure.min=today;
  }

  arrival?.addEventListener('change',()=>{
    if(departure){
      departure.min=arrival.value||today;

      if(departure.value&&departure.value<=arrival.value){
        departure.value='';
      }
    }
  });
}


/* -------------------------------------------------------
   Nardouw analytics consent
------------------------------------------------------- */

const NARDOUW_GA_ID='G-21PY5FML65';
const NARDOUW_CONSENT_KEY='nardouwAnalyticsConsent';

function loadGoogleAnalytics(){
  if(window.nardouwAnalyticsLoaded){
    return;
  }

  window.nardouwAnalyticsLoaded=true;

  window.dataLayer=window.dataLayer||[];

  window.gtag=function(){
    window.dataLayer.push(arguments);
  };

  gtag('js',new Date());
  gtag('config',NARDOUW_GA_ID);

  const script=document.createElement('script');
  script.async=true;
  script.src=`https://www.googletagmanager.com/gtag/js?id=${NARDOUW_GA_ID}`;

  document.head.appendChild(script);
}

function deleteAnalyticsCookies(){
  document.cookie='_ga=; Max-Age=0; path=/; SameSite=Lax';

  document.cookie.split(';').forEach(cookie=>{
    const name=cookie.split('=')[0].trim();

    if(name.startsWith('_ga_')){
      document.cookie=`${name}=; Max-Age=0; path=/; SameSite=Lax`;
    }
  });
}


/* -------------------------------------------------------
   Consent banner
------------------------------------------------------- */

const consentStyle=document.createElement('style');

consentStyle.textContent=`
  .nardouw-consent{
    position:fixed;
    left:24px;
    right:24px;
    bottom:24px;
    z-index:10000;
    max-width:760px;
    margin:0 auto;
    padding:24px 26px;
    background:#181821;
    color:#f9f9f2;
    border:1px solid rgba(249,249,242,.16);
    border-radius:20px;
    box-shadow:0 18px 55px rgba(24,24,33,.28);
    font-family:Montserrat,Arial,sans-serif;
  }

  .nardouw-consent[hidden]{
    display:none;
  }

  .nardouw-consent-title{
    margin:0 0 8px;
    font-family:'Cormorant Garamond',Georgia,serif;
    font-size:2rem;
    font-weight:500;
    line-height:1.05;
  }

  .nardouw-consent-text{
    margin:0;
    font-size:.86rem;
    line-height:1.65;
    opacity:.92;
  }

  .nardouw-consent-text a{
    color:#ff8a4c;
    text-decoration:underline;
    text-underline-offset:3px;
  }

  .nardouw-consent-actions{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    margin-top:18px;
  }

  .nardouw-consent-button{
    min-height:44px;
    padding:0 18px;
    border-radius:999px;
    border:1px solid #f26b21;
    font-family:Montserrat,Arial,sans-serif;
    font-size:.68rem;
    font-weight:600;
    letter-spacing:.12em;
    text-transform:uppercase;
    cursor:pointer;
  }

  .nardouw-consent-accept{
    background:#f26b21;
    color:#f9f9f2;
  }

  .nardouw-consent-decline{
    background:transparent;
    color:#f9f9f2;
  }

  @media(max-width:600px){
    .nardouw-consent{
      left:10px;
      right:10px;
      bottom:10px;
      padding:21px 20px;
      border-radius:18px;
    }

    .nardouw-consent-title{
      font-size:1.75rem;
    }

    .nardouw-consent-actions{
      flex-direction:column;
    }

    .nardouw-consent-button{
      width:100%;
    }
  }
`;

document.head.appendChild(consentStyle);


const consentBanner=document.createElement('div');

consentBanner.className='nardouw-consent';
consentBanner.hidden=true;
consentBanner.setAttribute('role','dialog');
consentBanner.setAttribute('aria-label','Analytics privacy choices');

consentBanner.innerHTML=`
  <h2 class="nardouw-consent-title">Your privacy</h2>

  <p class="nardouw-consent-text">
    Nardouw uses optional Google Analytics cookies to understand how visitors
    use the website and to improve the experience. Analytics will only load
    if you choose to accept it.
    <a href="privacy.html">Read our Privacy Notice</a>.
  </p>

  <div class="nardouw-consent-actions">
    <button
      type="button"
      class="nardouw-consent-button nardouw-consent-accept">
      Accept analytics
    </button>

    <button
      type="button"
      class="nardouw-consent-button nardouw-consent-decline">
      Decline
    </button>
  </div>
`;

document.body.appendChild(consentBanner);


/* -------------------------------------------------------
   Cookie preferences
------------------------------------------------------- */

const privacyChoices=document.createElement('a');

privacyChoices.href='#';
privacyChoices.textContent='Cookie Preferences';

const footerLegal=document.querySelector('.footer-legal-links');

if(footerLegal){
  footerLegal.appendChild(privacyChoices);
}


function showConsentBanner(){
  consentBanner.hidden=false;
}

function hideConsentBanner(){
  consentBanner.hidden=true;
}


consentBanner
  .querySelector('.nardouw-consent-accept')
  ?.addEventListener('click',()=>{
    localStorage.setItem(NARDOUW_CONSENT_KEY,'granted');
    loadGoogleAnalytics();
    hideConsentBanner();
  });


consentBanner
  .querySelector('.nardouw-consent-decline')
  ?.addEventListener('click',()=>{
    localStorage.setItem(NARDOUW_CONSENT_KEY,'denied');
    deleteAnalyticsCookies();
    hideConsentBanner();
  });


privacyChoices.addEventListener('click',e=>{
  e.preventDefault();
  showConsentBanner();
});


const savedConsent=localStorage.getItem(NARDOUW_CONSENT_KEY);

if(savedConsent==='granted'){
  loadGoogleAnalytics();
}
else if(savedConsent!=='denied'){
  showConsentBanner();
}
