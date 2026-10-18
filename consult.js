// Consultation form (Web3Forms) + Meta Pixel Lead events for each contact option.
(function () {
  function lead(method) { if (window.fbq) fbq('track', 'Lead', { content_name: 'Consultation', method: method }); }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-lead]');
    if (a) lead(a.getAttribute('data-lead'));
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
