(() => {
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (menu && nav) menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '✕' : '☰';
  });
  const langButton = document.querySelector('.lang-btn');
  let language = localStorage.getItem('brindhavan-language') || 'en';
  const applyLanguage = () => {
    document.documentElement.lang = language === 'ta' ? 'ta' : 'en';
    document.querySelectorAll('[data-en][data-ta]').forEach(el => {
      el.textContent = el.dataset[language];
    });
    document.querySelectorAll('[data-ph-en]').forEach(el => {
      el.placeholder = language === 'ta' ? el.dataset.phTa : el.dataset.phEn;
    });
    if (langButton) langButton.textContent = language === 'en' ? 'தமிழ்' : 'English';
    localStorage.setItem('brindhavan-language', language);
  };
  if (langButton) langButton.addEventListener('click', () => { language = language === 'en' ? 'ta' : 'en'; applyLanguage(); });
  applyLanguage();
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('.faq-q').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.faq-item'); const isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
    const symbol = button.querySelector('[data-faq-symbol]'); if (symbol) symbol.textContent = isOpen ? '−' : '+';
  }));
  const form = document.querySelector('#enquiry-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      'Hello Brindhavan Moms Care, I would like to enquire about accommodation.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Room preference: ${data.get('room') || 'Not specified'}`,
      `Message: ${data.get('message') || 'Please contact me with more details.'}`
    ].join('\n');
    window.open(`https://wa.me/919941593460?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
})();


/* ===== Welcome Intro Animation ===== */

window.addEventListener("load", function () {
    const welcomeScreen = document.getElementById("welcome-screen");

    if (welcomeScreen) {
        setTimeout(() => {
            welcomeScreen.classList.add("hide-welcome");

            setTimeout(() => {
                welcomeScreen.remove();
            }, 1000);

        }, 2500);
    }
});
