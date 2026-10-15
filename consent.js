// Meta Pixel – loaded only after cookie consent (GDPR / LEK).
(function () {
  var PIXEL_ID = '2376342289777243', KEY = 'emmai-consent';
  var en = document.documentElement.lang === 'en';

  function loadPixel() {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    // Booking happens on Bokadirekt, so count clicks on booking links as leads.
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href*="bokadirekt.se"]');
      if (a) fbq('track', 'Lead', { content_name: 'Bokadirekt' });
    });
  }

  var choice = localStorage.getItem(KEY);
  if (choice === 'yes') return loadPixel();
  if (choice === 'no') return;

  var bar = document.createElement('div');
  bar.className = 'cookie';
  bar.innerHTML = en
    ? '<p>We use cookies (Meta Pixel) to measure visits and improve our ads. Is that OK?</p><div><button data-c="no">Decline</button><button data-c="yes" class="ok">Accept</button></div>'
    : '<p>Vi använder cookies (Meta Pixel) för att mäta besök och förbättra våra annonser. Är det okej?</p><div><button data-c="no">Neka</button><button data-c="yes" class="ok">Acceptera</button></div>';
  bar.addEventListener('click', function (e) {
    var c = e.target.getAttribute('data-c');
    if (!c) return;
    localStorage.setItem(KEY, c);
    bar.remove();
    if (c === 'yes') loadPixel();
  });
  document.body.appendChild(bar);
})();
