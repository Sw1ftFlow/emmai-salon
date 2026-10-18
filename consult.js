// Consultation form (Web3Forms) + Meta Pixel Lead events for each contact option.
(function () {
  function lead(method) { if (window.fbq) fbq('track', 'Lead', { content_name: 'Consultation', method: method }); }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-lead]');
    if (!a) return;
    lead(a.getAttribute('data-lead'));
    // On phones, open the Instagram app directly; fall back to the web profile if the app isn't installed.
    if (a.getAttribute('data-lead') === 'Instagram' && /iPhone|iPad|Android/i.test(navigator.userAgent)) {
      e.preventDefault();
      var t = setTimeout(function () { location.href = a.href; }, 1200);
      document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(t); });
      location.href = 'instagram://user?username=emmai.pmu';
    }
  });

  var form = document.getElementById('consult-form');
  if (!form) return;
  var toggle = document.getElementById('consult-toggle');
  toggle.addEventListener('click', function () {
    form.hidden = !form.hidden;
    toggle.setAttribute('aria-expanded', String(!form.hidden));
    if (!form.hidden) form.querySelector('input[name=name]').focus();
  });
  var msg = form.querySelector('.form-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var btn = form.querySelector('button');
    btn.disabled = true;
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (!d.success) throw new Error();
      lead('Form');
      form.reset();
      msg.textContent = form.dataset.ok;
    }).catch(function () {
      msg.textContent = form.dataset.err;
    }).then(function () { btn.disabled = false; });
  });
})();

(function () {
  var v = document.querySelector('.hero-video');
  if (v && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); }
})();
