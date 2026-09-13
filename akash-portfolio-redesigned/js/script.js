(function(){
  "use strict";

  function init() {
    /* ---------- NAV: scroll state + mobile menu ---------- */
    var nav = document.getElementById('nav');
    var burger = document.getElementById('burger');
    var navLinks = document.getElementById('navLinks');
    var navScrim = document.getElementById('navScrim');

    if (nav) {
      window.addEventListener('scroll', function(){
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }

    function closeMenu(){
      if (navLinks) navLinks.classList.remove('open');
      if (navScrim) navScrim.classList.remove('open');
      if (burger) {
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    }
    function toggleMenu(){
      if (navLinks) {
        var isOpen = navLinks.classList.toggle('open');
        if (navScrim) navScrim.classList.toggle('open', isOpen);
        if (burger) {
          burger.classList.toggle('open', isOpen);
          burger.setAttribute('aria-expanded', String(isOpen));
        }
      }
    }
    if (burger) burger.addEventListener('click', toggleMenu);
    if (navScrim) navScrim.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav-link-item').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });

  /* ---------- PERSONA TOGGLE ---------- */
  var html = document.documentElement;
  var btnS = document.getElementById('btnSupervised');
  var btnU = document.getElementById('btnUnsupervised');
  var modeFooterLabel = document.getElementById('modeFooterLabel');

  function setMode(mode, announce){
    if (html) html.setAttribute('data-mode', mode);
    if (btnS) btnS.classList.toggle('active', mode === 'supervised');
    if (btnU) btnU.classList.toggle('active', mode === 'unsupervised');
    if (modeFooterLabel) modeFooterLabel.textContent = "// mode: " + mode;
    try { localStorage.setItem('akash-mode', mode); } catch(e){}
  }

  if (btnS) btnS.addEventListener('click', function(){ if (html && html.getAttribute('data-mode') !== 'supervised') setMode('supervised', true); });
  if (btnU) btnU.addEventListener('click', function(){ if (html && html.getAttribute('data-mode') !== 'unsupervised') setMode('unsupervised', true); });

  /* ---------- SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function(el){ io.observe(el); });

  /* ---------- ANIMATED COUNTERS ---------- */
  var counters = document.querySelectorAll('[data-count]');
  var counted = new WeakSet();
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting && !counted.has(entry.target)){
        counted.add(entry.target);
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(function(el){ cio.observe(el); });

  function animateCount(el){
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var start = null;
    function step(ts){
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- SCROLL PROGRESS DOT ---------- */
  var progressCircle = document.getElementById('progressCircle');
  var scrollProgress = document.getElementById('scrollProgress');
  var CIRC = 126;
  if (progressCircle) {
    window.addEventListener('scroll', function(){
      var h = document.documentElement;
      var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      var offset = CIRC - (scrolled * CIRC);
      progressCircle.style.strokeDashoffset = Math.max(0, offset);
    }, { passive: true });
  }
  if (scrollProgress) {
    scrollProgress.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- IMAGE REVEAL (fade/unblur once loaded) ---------- */
  var revealImgs = document.querySelectorAll('.about-photo img');
  revealImgs.forEach(function(img){
    function markLoaded(){ img.classList.add('img-loaded'); }
    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded);
      img.addEventListener('error', markLoaded);
    }
  });

  /* ---------- ABOUT PHOTO TILT ---------- */
  var aboutPhoto = document.querySelector('.about-photo');
  if (aboutPhoto && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    aboutPhoto.addEventListener('mousemove', function(e){
      var rect = aboutPhoto.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      aboutPhoto.style.transform = 'rotateY(' + (px * 10) + 'deg) rotateX(' + (py * -10) + 'deg) scale(1.02)';
    });
    aboutPhoto.addEventListener('mouseleave', function(){
      aboutPhoto.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  /* ---------- CONTACT FORM: validation + real submission (Formspree) ---------- */
  var form = document.getElementById('enquiryForm');
  if (form) {
    var submitBtn = form.querySelector('.form-submit');
    var formError = document.getElementById('form-error');
    var modal = document.getElementById('successModal');

    var fields = {
      ffirst: { el: document.getElementById('ffirst'), err: document.getElementById('err-ffirst') },
      flast: { el: document.getElementById('flast'), err: document.getElementById('err-flast') },
      femail: { el: document.getElementById('femail'), err: document.getElementById('err-femail') },
      ftype: { el: document.getElementById('ftype'), err: document.getElementById('err-ftype') },
      fmsg: { el: document.getElementById('fmsg'), err: document.getElementById('err-fmsg') }
    };

    function setFieldError(key, message){
      var f = fields[key];
      if (!f || !f.el) return;
      f.el.classList.toggle('invalid', !!message);
      if (f.err) f.err.textContent = message || '';
    }

    function isValidEmail(value){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validate(){
      var ok = true;
      if (!fields.ffirst.el.value.trim()){ setFieldError('ffirst', 'Please enter your first name.'); ok = false; }
      else setFieldError('ffirst', '');

      if (!fields.flast.el.value.trim()){ setFieldError('flast', 'Please enter your last name.'); ok = false; }
      else setFieldError('flast', '');

      if (!fields.femail.el.value.trim()){ setFieldError('femail', 'Please enter your email address.'); ok = false; }
      else if (!isValidEmail(fields.femail.el.value.trim())){ setFieldError('femail', 'Please enter a valid email address.'); ok = false; }
      else setFieldError('femail', '');

      if (!fields.ftype.el.value){ setFieldError('ftype', 'Please choose what you\'d like to connect for.'); ok = false; }
      else setFieldError('ftype', '');

      if (!fields.fmsg.el.value.trim()){ setFieldError('fmsg', 'Please add a short message.'); ok = false; }
      else setFieldError('fmsg', '');

      return ok;
    }

    Object.keys(fields).forEach(function(key){
      var f = fields[key];
      if (f.el) f.el.addEventListener('blur', validate);
    });

    function openModal(){
      if (!modal) return;
      modal.hidden = false;
      var closeBtn = document.getElementById('modalClose');
      if (closeBtn) closeBtn.focus();
      document.addEventListener('keydown', onModalKeydown);
    }
    function closeModal(){
      if (!modal) return;
      modal.hidden = true;
      document.removeEventListener('keydown', onModalKeydown);
      submitBtn.focus();
    }
    function onModalKeydown(e){
      if (e.key === 'Escape') closeModal();
    }
    var modalClose = document.getElementById('modalClose');
    var modalOk = document.getElementById('modalOk');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOk) modalOk.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      formError.textContent = '';

      if (!validate()){
        var firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var action = form.getAttribute('action') || '';
      if (!action || action.indexOf('YOUR_FORM_ID') !== -1){
        formError.textContent = 'Form isn\'t connected yet — set a real Formspree endpoint in the form\'s action attribute.';
        return;
      }

      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function(res){
        if (res.ok){
          form.reset();
          openModal();
        } else {
          return res.json().then(function(data){
            var msg = (data && data.errors && data.errors.length) ? data.errors.map(function(x){ return x.message; }).join(' ') : 'Something went wrong. Please try again.';
            throw new Error(msg);
          }).catch(function(){
            throw new Error('Something went wrong. Please try again.');
          });
        }
      }).catch(function(err){
        formError.textContent = err && err.message ? err.message : 'Something went wrong. Please try again.';
      }).finally(function(){
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      });
    });
  }

  /* ---------- NAV: scroll-spy active section ---------- */
  (function(){
    var navItems = document.querySelectorAll('.nav-link-item');
    if (!navItems.length) return;
    var sections = [];
    navItems.forEach(function(a){
      var id = a.getAttribute('href');
      if (id && id.charAt(0) === '#'){
        var sec = document.querySelector(id);
        if (sec) sections.push({ id: id, el: sec, link: a });
      }
    });
    if (!sections.length) return;

    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var match = sections.filter(function(s){ return s.el === entry.target; })[0];
        if (!match) return;
        if (entry.isIntersecting){
          sections.forEach(function(s){ s.link.classList.toggle('active', s === match); });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(function(s){ spy.observe(s.el); });
  })();

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================================================================
     CONTACT CANVAS — faint ambient data-node field
     ================================================================ */
  (function(){
    var canvas = document.getElementById('contactCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var W, H, DPR;
    var nodes = [];
    var COUNT = 34;

    function resize(){
      var rect = canvas.parentElement.getBoundingClientRect();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    function seed(){
      nodes = [];
      for (var i=0;i<COUNT;i++){
        nodes.push({
          x: Math.random()*W, y: Math.random()*H,
          vx: (Math.random()-0.5)*0.12, vy: (Math.random()-0.5)*0.12
        });
      }
    }
    function frame(){
      ctx.clearRect(0,0,W,H);
      var lc = getComputedStyle(document.documentElement).getPropertyValue('--line-strong').trim();
      var ac = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      nodes.forEach(function(n){
        n.x += n.vx; n.y += n.vy;
        if (n.x<0||n.x>W) n.vx *= -1;
        if (n.y<0||n.y>H) n.vy *= -1;
      });
      for (var i=0;i<nodes.length;i++){
        for (var j=i+1;j<nodes.length;j++){
          var dx = nodes[i].x-nodes[j].x, dy = nodes[i].y-nodes[j].y;
          var d = Math.sqrt(dx*dx+dy*dy);
          if (d < 120){
            ctx.globalAlpha = (1 - d/120) * 0.5;
            ctx.strokeStyle = lc;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      nodes.forEach(function(n){
        ctx.beginPath();
        ctx.arc(n.x,n.y,1.6,0,Math.PI*2);
        ctx.fillStyle = ac;
        ctx.fill();
      });
      if (!prefersReduced) requestAnimationFrame(frame);
    }
    resize(); seed(); frame();
    window.addEventListener('resize', function(){ resize(); });
  })();

    /* ---------- restore saved mode ---------- */
    try {
      var saved = localStorage.getItem('akash-mode');
      if (saved === 'unsupervised') setMode('unsupervised', false);
    } catch(e){}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
