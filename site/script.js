(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const setMenu = (open, returnFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (returnFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });

  const services = {
    starter: {
      number: '01 / STARTER', status: 'TERSEDIA', symbol: 'S.', title: ['Satu halaman.', 'Satu tujuan.'],
      description: 'Landing page yang fokus untuk memperkenalkan bisnis atau satu penawaran dengan alur informasi yang terarah.',
      points: ['One-page website', 'Struktur informasi yang fokus', 'Jalur konsultasi yang jelas'],
      cta: 'Diskusikan Starter', message: 'Halo ADES, saya tertarik dengan layanan Starter.', foot: '01 — A FOCUSED BEGINNING'
    },
    business: {
      number: '02 / BUSINESS', status: 'TERSEDIA', symbol: 'B.', title: ['Lebih banyak ruang.', 'Lebih banyak halaman.'],
      description: 'Website multi-halaman untuk kebutuhan informasi bisnis yang lebih luas. Jumlah halaman adalah pembeda yang telah dikonfirmasi; detail lain dibahas saat konsultasi.',
      points: ['Website multi-halaman', 'Informasi bisnis yang lebih luas', 'Struktur dan jumlah halaman dibahas bersama'],
      cta: 'Diskusikan Business', message: 'Halo ADES, saya ingin berdiskusi tentang layanan Business (website multi-halaman).', foot: '02 — ROOM TO EXPLAIN MORE'
    },
    custom: {
      number: '03 / CUSTOM', status: 'INQUIRY TERBUKA', symbol: 'C.', title: ['Mulai dari', 'percakapan.'],
      description: 'Untuk kebutuhan yang belum terwakili oleh pilihan awal. Kita pahami konteksnya lebih dulu sebelum menentukan ruang lingkup dan kelayakan.',
      points: ['Konsultasi kebutuhan', 'Discovery dan peninjauan kelayakan', 'Harga dan timeline setelah pembahasan'],
      cta: 'Bahas kebutuhan khusus', message: 'Halo ADES, saya ingin konsultasi mengenai kebutuhan website Custom.', foot: '03 — DEFINE THE RIGHT SCOPE'
    }
  };
  const serviceTabs = [...document.querySelectorAll('.service-tab')];
  const servicePanel = document.querySelector('#service-detail');
  function selectService(key, focusTab = false) {
    const item = services[key];
    const active = serviceTabs.find(tab => tab.dataset.service === key);
    serviceTabs.forEach(tab => {
      const selected = tab === active;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    servicePanel.setAttribute('aria-labelledby', active.id);
    document.querySelector('#detail-number').textContent = item.number;
    document.querySelector('#detail-status').textContent = item.status;
    document.querySelector('#detail-symbol').textContent = item.symbol;
    const serviceTitle = document.querySelector('#detail-title');\n    const serviceEmphasis = document.createElement('em');\n    serviceEmphasis.textContent = item.title[1];\n    serviceTitle.replaceChildren(document.createTextNode(item.title[0]), document.createElement('br'), serviceEmphasis);
    document.querySelector('#detail-description').textContent = item.description;
    document.querySelector('#detail-points').replaceChildren(...item.points.map(point => {
      const li = document.createElement('li'); li.textContent = point; return li;
    }));
    const cta = document.querySelector('#detail-cta');
    cta.textContent = item.cta;
    const arrow = document.createElement('span'); arrow.textContent = '↗'; cta.append(arrow);
    cta.href = 'https://wa.me/6281246027946?text=' + encodeURIComponent(item.message);
    document.querySelector('#detail-foot').textContent = item.foot;
    if (focusTab) active.focus();
  }
  serviceTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectService(tab.dataset.service));
    tab.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowDown') next = (index + 1) % serviceTabs.length;
      if (event.key === 'ArrowUp') next = (index - 1 + serviceTabs.length) % serviceTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = serviceTabs.length - 1;
      selectService(serviceTabs[next].dataset.service, true);
    });
  });

  const method = [
    {overline:'01 — UNDERSTAND BEFORE DESIGN', title:['Start with','understanding.'], text:'Kami mempelajari konteks bisnis, audiens, kebutuhan, dan tujuan website. Hasilnya menjadi dasar untuk menentukan apa yang perlu disampaikan dan diprioritaskan.', output:'OUTPUT / SHARED UNDERSTANDING', graphic:'01 / ASK BETTER QUESTIONS'},
    {overline:'02 — EXPLORE THE POSSIBILITIES', title:['Explore a','clear direction.'], text:'Kami mengeksplorasi alternatif arah desain dan struktur pengalaman. Pilihan dibahas berdasarkan konteks dan tujuan, bukan sekadar preferensi visual.', output:'OUTPUT / AGREED DESIGN DIRECTION', graphic:'02 / TEST THE OPTIONS'},
    {overline:'03 — TURN DIRECTION INTO FORM', title:['Make it','work in the world.'], text:'Arah yang disepakati diterjemahkan menjadi implementasi frontend yang responsif, dengan perhatian pada struktur, keterbacaan, dan interaksi.', output:'OUTPUT / RESPONSIVE FRONTEND', graphic:'03 / BUILD WITH INTENT'},
    {overline:'04 — CHECK THE EXPERIENCE', title:['Details make','the difference.'], text:'Kami memeriksa tampilan, navigasi, interaksi, responsivitas, dan kesiapan handover. Temuan diperbaiki sebelum hasil diserahkan.', output:'OUTPUT / REVIEWED HANDOVER', graphic:'04 / VERIFY THE DETAILS'}
  ];
  const methodTabs = [...document.querySelectorAll('.method-step')];
  const methodPanel = document.querySelector('#method-detail');
  function selectMethod(index, focusTab = false) {
    const item = method[index], active = methodTabs[index];
    methodTabs.forEach((tab, i) => {
      const selected = i === index;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    methodPanel.setAttribute('aria-labelledby', active.id);
    document.querySelector('#method-overline').textContent = item.overline;
    const methodTitle = document.querySelector('#method-title');\n    const methodEmphasis = document.createElement('em');\n    methodEmphasis.textContent = item.title[1];\n    methodTitle.replaceChildren(document.createTextNode(item.title[0]), document.createElement('br'), methodEmphasis);
    document.querySelector('#method-text').textContent = item.text;
    document.querySelector('#method-output').textContent = item.output;
    document.querySelector('#method-graphic-label').textContent = item.graphic;
    if (focusTab) active.focus();
  }
  methodTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectMethod(index));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % methodTabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + methodTabs.length) % methodTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = methodTabs.length - 1;
      selectMethod(next, true);
    });
  });

  const progress = document.querySelector('#reading-progress');
  let ticking = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, {passive:true});
  updateProgress();
})();