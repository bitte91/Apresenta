
        // Load Header and Footer
        document.addEventListener("DOMContentLoaded", function() {
            fetch("header.html")
                .then(response => response.text())
                .then(data => {
                    document.getElementById("header").innerHTML = data;
                    setActiveNav();

                    // Mobile Menu Toggle
                    const menuToggle = document.getElementById('menu-toggle');
                    const mobileNav = document.getElementById('mobile-nav');
                    const overlay = document.getElementById('overlay');
                    const mobileNavClose = document.getElementById('mobile-nav-close');

                    function openMobileMenu() {
                        mobileNav.classList.add('active');
                        overlay.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }

                    function closeMobileMenu() {
                        mobileNav.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }

                    menuToggle.addEventListener('click', openMobileMenu);
                    mobileNavClose.addEventListener('click', closeMobileMenu);
                    overlay.addEventListener('click', closeMobileMenu);
                });

            fetch("footer.html")
                .then(response => response.text())
                .then(data => {
                    document.querySelector("footer").innerHTML = data;
                });
        });

        // Theme Selector
        const themeOptions = document.querySelectorAll('.theme-option');
        const mobileThemeOptions = document.querySelectorAll('.mobile-theme-option');

        function setTheme(themeName) {
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            mobileThemeOptions.forEach(opt => opt.classList.remove('active'));

            // Apply theme
            if (themeName === 'ocean') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', themeName);
            }

            // Add active class to selected options
            themeOptions.forEach(opt => {
                if (opt.getAttribute('data-theme') === themeName) {
                    opt.classList.add('active');
                }
            });

            mobileThemeOptions.forEach(opt => {
                if (opt.getAttribute('data-theme') === themeName) {
                    opt.classList.add('active');
                }
            });

            // Save theme preference to localStorage
            localStorage.setItem('theme', themeName);
        }

        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const themeName = this.getAttribute('data-theme');
                setTheme(themeName);
            });
        });

        mobileThemeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const themeName = this.getAttribute('data-theme');
                setTheme(themeName);
            });
        });

        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'ocean';
        setTheme(savedTheme);

        // Splash Screen
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('splash-screen').classList.add('hidden');
            }, 2000);
        });

        // Header Scroll Effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const overlay = document.getElementById('overlay');
        const mobileNavClose = document.getElementById('mobile-nav-close');

        function openMobileMenu() {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        menuToggle.addEventListener('click', openMobileMenu);
        mobileNavClose.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);

        // Navigation Active State
        function setActiveNav() {
            const navTabs = document.querySelectorAll('.nav-tab');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            const currentPage = window.location.pathname.split('/').pop();

            navTabs.forEach(tab => {
                const tabLink = tab.getAttribute('href');
                if (tabLink === currentPage) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            mobileNavLinks.forEach(link => {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        // Animate Skill Bars on Scroll
        const animateSkillBars = function() {
            const skillBars = document.querySelectorAll('.skill-progress');

            skillBars.forEach(skillBar => {
                const skillLevel = skillBar.getAttribute('data-skill');
                const rect = skillBar.getBoundingClientRect();

                if (rect.top <= window.innerHeight && rect.bottom >= 0 && skillBar.style.width === '') {
                    skillBar.style.width = skillLevel + '%';
                }
            });
        };

        window.addEventListener('scroll', animateSkillBars);
        window.addEventListener('load', animateSkillBars);

        // Form Submission
        const contactForm = document.getElementById('contact-form');
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');

        function showToast(message, isSuccess = true) {
            toast.className = 'toast';
            if (isSuccess) {
                toast.classList.add('success');
            } else {
                toast.classList.add('error');
            }
            toastMessage.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');

        function validateField(input, errorContainer, validationFn) {
            const isValid = validationFn(input.value);
            if (!isValid) {
                errorContainer.textContent = 'Campo inválido.';
            } else {
                errorContainer.textContent = '';
            }
            return isValid;
        }

        nameInput.addEventListener('input', () => validateField(nameInput, nameError, value => value.trim() !== ''));
        emailInput.addEventListener('input', () => validateField(emailInput, emailError, value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)));
        subjectInput.addEventListener('input', () => validateField(subjectInput, subjectError, value => value.trim() !== ''));
        messageInput.addEventListener('input', () => validateField(messageInput, messageError, value => value.trim() !== ''));

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const isNameValid = validateField(nameInput, nameError, value => value.trim() !== '');
            const isEmailValid = validateField(emailInput, emailError, value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
            const isSubjectValid = validateField(subjectInput, subjectError, value => value.trim() !== '');
            const isMessageValid = validateField(messageInput, messageError, value => value.trim() !== '');

            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                showToast(`Obrigado pela sua mensagem, ${nameInput.value}! Entrarei em contato em breve.`);
                contactForm.reset();
            } else {
                showToast('Por favor, corrija os erros no formulário.', false);
            }
        });

        // Floating Action Button
        const fab = document.getElementById('fab');

        fab.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide FAB based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                fab.style.opacity = '1';
                fab.style.visibility = 'visible';
            } else {
                fab.style.opacity = '0';
                fab.style.visibility = 'hidden';
            }
        });

        // Add animation on scroll for sections
        const animateOnScroll = function() {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
        };

        // Initial setup for animation
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
     