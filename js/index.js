(function () {
            var toggle = document.querySelector('.nav-toggle');
            var nav = document.getElementById('primary-nav');
            if (toggle && nav) {
                toggle.addEventListener('click', function () {
                    var open = nav.classList.toggle('open');
                    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
                nav.querySelectorAll('a').forEach(function (link) {
                    link.addEventListener('click', function () {
                        nav.classList.remove('open');
                        toggle.setAttribute('aria-expanded', 'false');
                    });
                });
            }

            var year = document.getElementById('year');
            if (year) year.textContent = new Date().getFullYear();

            /* contact removed */

            var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            var items = document.querySelectorAll('.reveal');
            if (prefersReduced || !('IntersectionObserver' in window)) {
                items.forEach(function (el) { el.classList.add('visible'); });
            } else {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.12 });
                items.forEach(function (el) { observer.observe(el); });
            }
        })();
