(function(){
  var els = document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    els.forEach(function(e){e.classList.add('in');});
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en,i){
      if(en.isIntersecting){
        var d = en.target.classList.contains('tape__row') ? (i*70) : 0;
        setTimeout(function(){en.target.classList.add('in');}, d);
        io.unobserve(en.target);
      }
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:.12});
  els.forEach(function(e){io.observe(e);});
})();
