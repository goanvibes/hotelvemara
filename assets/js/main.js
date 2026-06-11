const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', body.classList.contains('menu-open') ? 'true' : 'false');
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
  input.min = today;
  if (!input.value) input.value = today;
});

function encodeMessage(form) {
  const data = new FormData(form);
  const lines = [
    'Hello Hotel Vemara, I would like to enquire about a stay.',
    '',
    `Name: ${data.get('name') || 'Guest'}`,
    `Phone: ${data.get('phone') || 'Not added'}`,
    `Check-in: ${data.get('checkin') || 'Not selected'}`,
    `Check-out: ${data.get('checkout') || 'Not selected'}`,
    `Room: ${data.get('room') || 'Not selected'}`,
    `Guests: ${data.get('guests') || 'Not selected'}`,
    data.get('message') ? `Message: ${data.get('message')}` : ''
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n'));
}

document.querySelectorAll('[data-booking-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const url = `https://wa.me/919170837878?text=${encodeMessage(form)}`;
    window.open(url, '_blank', 'noopener');
  });
});

document.querySelectorAll('[data-email-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Hotel Vemara Enquiry');
    const body = encodeURIComponent([
      `Name: ${data.get('name') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Requirement: ${data.get('requirement') || ''}`,
      '',
      data.get('message') || ''
    ].join('\n'));
    window.location.href = `mailto:resevations.vemara@gmail.com?subject=${subject}&body=${body}`;
  });
});

const filterButtons = document.querySelectorAll('[data-room-filter]');
const roomCards = document.querySelectorAll('[data-room-card]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const type = button.dataset.roomFilter;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    roomCards.forEach(card => {
      const show = type === 'all' || card.dataset.roomCard === type;
      card.style.display = show ? '' : 'none';
    });
  });
});

document.querySelectorAll('.faq-q').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const stickyBook = document.querySelector('.sticky-book');
if (stickyBook) {
  const toggleSticky = () => stickyBook.classList.toggle('visible', window.scrollY > 640);
  window.addEventListener('scroll', toggleSticky, { passive: true });
  toggleSticky();
}
