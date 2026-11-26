{
  // Skills rendered from data
  const skills = [
    ['Languages & core', ['Dart', 'OOP', 'Data Structures', 'Clean Architecture', 'MVVM']],
    ['Framework', ['Flutter', 'Android & iOS', 'Responsive & Adaptive UI']],
    ['State management', ['Provider', 'GetX', 'BLoC']],
    ['Backend & APIs', ['Node.js', 'Express.js', 'Firebase', 'Supabase', 'Google Sign-in', 'REST APIs', 'Dio']],
    ['Data & storage', ['MongoDB', 'Firestore', 'Hive', 'SQFLite', 'Shared Preferences']],
    ['Payments & alerts', ['Stripe', 'In-App Purchases', 'Push Notifications']],
    ['Tools & release', ['Git', 'GitHub', 'Postman', 'Google Play Console', 'App Store Connect']]
  ];
  const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  document.getElementById('skillList').innerHTML = skills.map(([group, items]) =>
    `<div class="sk"><h4>${esc(group)}</h4><div class="chips">${items.map(i => `<span>${esc(i)}</span>`).join('')}</div></div>`
  ).join('');

  document.getElementById('yr').textContent = new Date().getFullYear();

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal
  const revealEls = document.querySelectorAll('.card, .head, .facts li');
  revealEls.forEach(el => el.classList.add('reveal'));
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  // Active nav link (pressed-in state)
  const links = [...document.querySelectorAll('.links a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href')));
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => s && navObs.observe(s));

  // Phone: gentle tilt toward the pointer
  const phone = document.getElementById('phone');
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('pointermove', e => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      phone.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    });
    document.addEventListener('pointerleave', () => { phone.style.transform = ''; });
  }

  // Phone: pressable tiles and platform switch
  document.querySelectorAll('[data-press]').forEach(t => {
    t.addEventListener('pointerdown', () => t.classList.add('pressed'));
    ['pointerup', 'pointerleave'].forEach(ev => t.addEventListener(ev, () => t.classList.remove('pressed')));
  });
  const sw = document.querySelector('.switch');
  sw.addEventListener('click', () => sw.classList.toggle('on'));
  if (!reduce) setInterval(() => sw.classList.toggle('on'), 2600);

  // Copy email
  const toast = document.getElementById('toast');
  let tId;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(tId);
    tId = setTimeout(() => toast.classList.remove('show'), 2200);
  };
  document.getElementById('copyBtn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('syedashir07@gmail.com');
      showToast('Email copied to clipboard');
    } catch {
      showToast('syedashir07@gmail.com');
    }
  });
}
