// Sign-up form: front-end only until it is wired to a delivery
// destination at handover (the club's existing handler, an email
// service, or a small Worker). On submit, show the confirmation
// panel; the page also carries a fallback link to the club's
// current live form so no signup can be lost in the meantime.
(function(){
  var form = document.querySelector('.signup-form');
  var done = document.querySelector('.signup-done');
  if(!form || !done) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!form.reportValidity()) return;
    form.style.display = 'none';
    done.classList.add('is-shown');
    done.setAttribute('tabindex','-1');
    done.focus();
  });
})();
