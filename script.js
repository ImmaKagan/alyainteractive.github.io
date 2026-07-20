// Language Dropdown Toggle
function toggleLangMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

/* ==========================================================================
   Alya Interactive - Interactive Behaviors & UI Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Effect on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        highlightActiveNav();
    });

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

// 5. Contact Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const statusDiv = document.getElementById('form-status');
    const btnSend = document.getElementById('btn-send-message');

    if (!statusDiv || !btnSend) return;

    btnSend.disabled = true;
    btnSend.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    setTimeout(() => {
        statusDiv.className = 'form-status success';
        statusDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
        document.getElementById('contact-form').reset();
        
        btnSend.disabled = false;
        btnSend.innerHTML = `<span>Sent</span> <i class="fa-solid fa-check"></i>`;

        setTimeout(() => {
            btnSend.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
            statusDiv.innerHTML = '';
        }, 4000);
    }, 1200);
}
