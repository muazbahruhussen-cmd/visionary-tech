document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Navigation Scroll Behavior ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Sidebar Menu Controls ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Dark & Light Mode Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // --- Hero Text Typing Automation ---
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = JSON.parse(typingElement.getAttribute('data-words'));
        let wordIdx = 0, charIdx = 0, isDeleting = false;

        function typeLoop() {
            const currentWord = words[wordIdx];
            typingElement.textContent = isDeleting 
                ? currentWord.substring(0, charIdx - 1) 
                : currentWord.substring(0, charIdx + 1);
            
            charIdx = isDeleting ? charIdx - 1 : charIdx + 1;
            let speed = isDeleting ? 35 : 75;

            if (!isDeleting && charIdx === currentWord.length) {
                speed = 2200; // Time text stays filled
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                speed = 400; // Pause duration before next sequence
            }
            setTimeout(typeLoop, speed);
        }
        setTimeout(typeLoop, 600);
    }

    // --- Tech Console Output Simulation ---
    const terminal = document.getElementById('terminalLiveOutput');
    const logs = [
        { type: 'cmd', text: '$ visionary-tech --deploy:core' },
        { type: 'output', text: '📦 Compiling serverless pipeline modules...' },
        { type: 'output', text: '✅ Architecture integrity verified cleanly.' },
        { type: 'cmd', text: '$ visionary-ai --live-analytics' },
        { type: 'output', text: '🤖 Neural interfaces synced securely with cloud datasets.' },
        { type: 'output', text: '📊 Automated optimizations executing safely at 99.8% metrics.' },
        { type: 'cmd', text: '$ system-status' },
        { type: 'output', text: '✨ All regional network layers fully functional.' }
    ];
    let logIdx = 0;

    function renderTerminal() {
        if (logIdx < logs.length) {
            const line = document.createElement('p');
            line.className = `term-line ${logs[logIdx].type}`;
            line.textContent = logs[logIdx].text;
            terminal.appendChild(line);
            terminal.scrollTop = terminal.scrollHeight;
            logIdx++;
            setTimeout(renderTerminal, logs[logIdx - 1].type === 'cmd' ? 1400 : 700);
        } else {
            setTimeout(() => {
                terminal.innerHTML = '<p class="term-line output">// Cycling core simulation parameters...</p>';
                logIdx = 0;
                renderTerminal();
            }, 5000);
        }
    }
    if (terminal) renderTerminal();

    // --- Interactive Case Study Filters ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedFilter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (selectedFilter === 'all' || category === selectedFilter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // --- Mouse-Tracking 3D Card Hover Tilt Effect ---
    const interactiveCards = document.querySelectorAll('.interactive-tilt');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const bounds = card.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left - (bounds.width / 2);
            const mouseY = e.clientY - bounds.top - (bounds.height / 2);
            card.style.transform = `perspective(1000px) rotateX(${-mouseY / 14}deg) rotateY(${mouseX / 14}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // --- Scroll Triggered Reveal Engine ---
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const observerConfig = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" };

    const revealObserver = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                if (entry.target.classList.contains('stats') || entry.target.querySelector('.stat-number')) {
                    fireCounters();
                }
                self.unobserve(entry.target);
            }
        });
    }, observerConfig);

    scrollElements.forEach(el => revealObserver.observe(el));
    const statsSection = document.querySelector('.stats');
    if (statsSection) revealObserver.observe(statsSection);

    // --- Stats Numerical Increments Engine ---
    let calculationsFired = false;
    function fireCounters() {
        if (calculationsFired) return;
        calculationsFired = true;

        document.querySelectorAll('.stat-number').forEach(counter => {
            const limit = +counter.getAttribute('data-target');
            const step = limit / 40;

            const incrementSequence = () => {
                const currentVal = +counter.innerText;
                if (currentVal < limit) {
                    counter.innerText = Math.ceil(currentVal + step);
                    setTimeout(incrementSequence, 20);
                } else {
                    counter.innerText = limit;
                }
            };
            incrementSequence();
        });
    }
});