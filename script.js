// Language Dropdown Toggle
function toggleLangMenu(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Directory Real-Time Filter & Search Logic
let currentCategory = 'all';

function filterCategory(cat, btnElement) {
    currentCategory = cat;
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    filterApps();
}

function filterApps() {
    const searchInput = document.getElementById('app-search-input');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const cards = document.querySelectorAll('#full-apps-grid .app-card');

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        const cardName = card.getAttribute('data-name') || '';

        const matchesCat = (currentCategory === 'all' || cardCat === currentCategory);
        const matchesQuery = (query === '' || cardName.includes(query));

        if (matchesCat && matchesQuery) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ==========================================================================
   Alya Interactive - Interactive Behaviors & UI Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Effect on Scroll
    const navbar = document.getElementById('navbar');
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 30) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                highlightActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Highlight Active Section in Navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
});

// 4. Modal Open & Close Functions
function openModal(appKey) {
    const modal = document.getElementById('app-modal');
    const hushguardDetails = document.getElementById('modal-hushguard');
    const snacktaskDetails = document.getElementById('modal-snacktask');

    if (!modal) return;

    // Reset visibility
    if (hushguardDetails) hushguardDetails.style.display = 'none';
    if (snacktaskDetails) snacktaskDetails.style.display = 'none';

    if (appKey === 'hushguard' && hushguardDetails) {
        hushguardDetails.style.display = 'block';
    } else if (appKey === 'snacktask' && snacktaskDetails) {
        snacktaskDetails.style.display = 'block';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('app-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeModalOnBackdrop(event) {
    if (event.target.id === 'app-modal') {
        closeModal();
    }
}

// Keyboard ESC close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 5. Contact Form Submission Handler (FormSubmit API + Mailto Fallback)
function handleFormSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const statusDiv = document.getElementById('form-status');
    const btnSend = document.getElementById('btn-send-message');

    if (!statusDiv || !btnSend) return;

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    btnSend.disabled = true;
    btnSend.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    fetch('https://formsubmit.co/ajax/alyainteractive@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `New Inquiry from ${name} via Alya Interactive Website`,
            _captcha: "false",
            _template: "table"
        })
    })
    .then(response => response.json())
    .then(data => {
        statusDiv.className = 'form-status success';
        statusDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully to alyainteractive@gmail.com.';
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        // Fallback to mailto link if API fails
        const mailtoUri = `mailto:alyainteractive@gmail.com?subject=${encodeURIComponent('Inquiry from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
        window.location.href = mailtoUri;
        statusDiv.className = 'form-status success';
        statusDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Opening your email client to send message...';
    })
    .finally(() => {
        btnSend.disabled = false;
        btnSend.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
        setTimeout(() => {
            statusDiv.innerHTML = '';
        }, 6000);
    });
}
