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

const galleryButtons=[...document.querySelectorAll('[data-lightbox]')];
const lightbox=document.querySelector('.lightbox');
const lightboxImg=lightbox?.querySelector('img');
const lightboxClose=lightbox?.querySelector('.lightbox-close');

function closeLightbox(){
  lightbox?.classList.remove('open');
  document.body.style.overflow='';
}

galleryButtons.forEach(btn=>btn.addEventListener('click',()=>{
  if(!lightbox||!lightboxImg) return;

  lightboxImg.src=btn.dataset.lightbox;
  lightboxImg.alt=btn.querySelector('img')?.alt||'Nardouw image';
  lightbox.classList.add('open');
  document.body.style.overflow='hidden';
}));

lightboxClose?.addEventListener('click',closeLightbox);

lightbox?.addEventListener('click',e=>{
  if(e.target===lightbox){
    closeLightbox();
  }
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeLightbox();
  }
});

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
   Consent banner styling
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


/* -------------------------------------------------------
   Create consent banner
------------------------------------------------------- */

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
   Cookie preferences link in footer
------------------------------------------------------- */

const privacyChoices=document.createElement('a');

privacyChoices.href='#';
privacyChoices.textContent='Cookie Preferences';

const footerLegal=document.querySelector('.footer-legal-links');

if(footerLegal){
  footerLegal.appendChild(privacyChoices);
}


/* -------------------------------------------------------
   Consent controls
------------------------------------------------------- */

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


/* -------------------------------------------------------
   Apply saved choice
------------------------------------------------------- */

const savedConsent=localStorage.getItem(NARDOUW_CONSENT_KEY);

if(savedConsent==='granted'){
  loadGoogleAnalytics();
}
else if(savedConsent!=='denied'){
  showConsentBanner();
}
