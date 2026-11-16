(function () {
    'use strict';
    if (window.__shgGuard) return;
    window.__shgGuard = true;

    var XSS = /<\s*script|<\/\s*script|<[^>]*\son\w+\s*=|<\s*(img|svg|iframe|object|embed|math|video|audio|link|meta|base|form)\b|javascript:|vbscript:|data:text\/html|document\.(cookie|domain|location|write)|window\.(location|open)|eval\s*\(|alert\s*\(|prompt\s*\(|confirm\s*\(|fromCharCode|\\x[0-9a-f]{2}/i;
    var SQLI = /\bunion\b[\s\S]{0,40}\bselect\b|\bselect\b[\s\S]{0,60}\bfrom\b|\binsert\b[\s\S]{0,25}\binto\b|\bdelete\b[\s\S]{0,25}\bfrom\b|\bupdate\b[\s\S]{0,40}\bset\b|\bdrop\b[\s\S]{0,20}\b(table|database|index)\b|\btruncate\b[\s\S]{0,20}\btable\b|\balter\b[\s\S]{0,25}\btable\b|\bexec(ute)?\b[\s\S]{0,20}\(|xp_cmdshell|information_schema|\bsleep\s*\(|\bbenchmark\s*\(|\bwaitfor\s+delay\b|;\s*--|\/\*[\s\S]*\*\/|['"]\s*or\s+['"]|\bor\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i;

    var CSS = [
        '.shg-overlay{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:1.25rem;background:radial-gradient(65% 60% at 50% 40%,rgba(46,0,5,.55),rgba(2,2,2,.9));backdrop-filter:blur(7px);opacity:0;pointer-events:none;transition:opacity .3s ease}',
        '.shg-overlay.show{opacity:1;pointer-events:auto}',
        '.shg-overlay[hidden]{display:none}',
        '.shg-modal{position:relative;width:min(430px,100%);max-height:calc(100vh - 2.5rem);overflow:auto;background:linear-gradient(180deg,#0e0b0c,#080708);border:1px solid rgba(204,0,17,.5);border-radius:16px;padding:1.2rem 1.4rem 1.4rem;text-align:center;font-family:Inter,-apple-system,"Segoe UI",sans-serif;color:#d6d6d6;box-shadow:0 0 0 1px rgba(204,0,17,.08),0 30px 80px rgba(0,0,0,.75),0 0 60px rgba(204,0,17,.22);transform:translateY(16px) scale(.96);transition:transform .3s ease}',
        '.shg-overlay.show .shg-modal{transform:none}',
        '.shg-gifwrap{display:flex;justify-content:center;margin:-.1rem 0 .35rem}',
        '.shg-gifwrap img{width:104px;height:auto;border-radius:12px;border:1px solid rgba(204,0,17,.3);box-shadow:0 0 26px rgba(204,0,17,.28);background:#0a0708}',
        '.shg-eyebrow{font-family:Cinzel,Georgia,serif;font-size:.7rem;letter-spacing:.28em;text-transform:uppercase;color:#cc0011;margin:0 0 .35rem}',
        '.shg-title{font-family:Cinzel,Georgia,serif;font-size:1.5rem;line-height:1.2;color:#fff;margin:0 0 .5rem;letter-spacing:.03em}',
        '.shg-text{margin:0 0 .9rem;color:#bdbdbd;font-size:.95rem;line-height:1.55}',
        '.shg-text strong{color:#fff}',
        '.shg-payload-wrap{text-align:left;margin:0 0 .7rem}',
        '.shg-label{display:block;font-size:.64rem;letter-spacing:.2em;text-transform:uppercase;color:#7d7d7d;margin-bottom:.3rem}',
        '.shg-payload{display:block;max-height:86px;overflow:auto;padding:.55rem .65rem;border:1px solid #262626;border-radius:8px;background:#0a0a0a;color:#ff9aa2;font-family:ui-monospace,Consolas,monospace;font-size:.78rem;word-break:break-word;white-space:pre-wrap}',
        '.shg-loc{margin:0 0 1rem;font-size:.82rem;color:#8f8f8f;letter-spacing:.03em}',
        '.shg-loc b{color:#e6e6e6;font-weight:600}',
        '.shg-btn{width:100%;padding:.8rem 1rem;border-radius:999px;border:1px solid transparent;background:linear-gradient(180deg,#cc0011,#8f000c);color:#fff;font:inherit;font-weight:600;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease}',
        '.shg-btn:hover{transform:translateY(-1px);box-shadow:0 12px 28px rgba(204,0,17,.28)}',
        '.shg-flagged{animation:shgShake .35s ease}',
        '@keyframes shgShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}',
        '@media (max-width:480px){.shg-modal{padding:1rem 1rem 1.15rem}.shg-gifwrap img{width:86px}.shg-title{font-size:1.25rem}.shg-text{font-size:.9rem}.shg-payload{font-size:.74rem}}',
        '@media (prefers-reduced-motion:reduce){.shg-overlay,.shg-modal,.shg-btn{transition:none!important}.shg-flagged{animation:none!important}}'
    ].join('\n');

    var overlay = null, payloadEl = null, locEl = null, open = false, lastAt = 0, locCache = '';
    var alertAudio = null, tickAudio = null, prevFocus = null, prevOverflow = '';
    var gifSrc = 'rabbit-with-clock.gif', tickSrc = 'clock-ticking-357979.mp3', alertSrc = 'hacker-alert.wav';

    function soundOn() {
        try { return localStorage.getItem('sh_sound') !== '0'; } catch (e) { return true; }
    }

    function ensureAudio() {
        if (!alertAudio) {
            try { alertAudio = new Audio(alertSrc); alertAudio.preload = 'auto'; alertAudio.volume = 0.7; } catch (e) { alertAudio = null; }
        }
        if (!tickAudio) {
            try { tickAudio = new Audio(tickSrc); tickAudio.preload = 'auto'; tickAudio.loop = true; tickAudio.volume = 0.5; } catch (e) { tickAudio = null; }
        }
    }

    function playSounds() {
        if (!soundOn()) return;
        ensureAudio();
        try {
            if (alertAudio) {
                alertAudio.currentTime = 0;
                var p = alertAudio.play();
                if (p && p.catch) p.catch(function () {});
            }
            if (tickAudio) {
                tickAudio.currentTime = 0;
                var q = tickAudio.play();
                if (q && q.catch) q.catch(function () {});
            }
        } catch (e) {}
    }

    function stopSounds() {
        try { if (tickAudio) tickAudio.pause(); } catch (e) {}
        try { if (alertAudio) { alertAudio.pause(); alertAudio.currentTime = 0; } } catch (e) {}
    }

    function styleOnce() {
        if (document.getElementById('shg-style')) return;
        var s = document.createElement('style');
        s.id = 'shg-style';
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    function esc(s) { return String(s == null ? '' : s); }

    function build() {
        if (overlay) return;
        styleOnce();
        overlay = document.createElement('div');
        overlay.className = 'shg-overlay';
        overlay.id = 'shg-overlay';
        overlay.hidden = true;
        overlay.setAttribute('role', 'alertdialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'shg-title');
        overlay.innerHTML =
            '<div class="shg-modal">' +
                '<div class="shg-gifwrap"><img src="' + gifSrc + '" alt="A rabbit holding a ticking clock" width="104"></div>' +
                '<p class="shg-eyebrow" id="shg-type">Intrusion Detected</p>' +
                '<h2 class="shg-title" id="shg-title">Nice try.</h2>' +
                '<p class="shg-text">That input was flagged and <strong>blocked</strong> before it could touch anything. Your location has been sent to the <strong>Dark Society</strong>.</p>' +
                '<div class="shg-payload-wrap"><span class="shg-label">Intercepted payload</span><code class="shg-payload"></code></div>' +
                '<p class="shg-loc">Origin: <b>locating…</b></p>' +
                '<button class="shg-btn" type="button">I understand</button>' +
            '</div>';
        document.body.appendChild(overlay);
        payloadEl = overlay.querySelector('.shg-payload');
        locEl = overlay.querySelector('.shg-loc b');
        overlay.querySelector('.shg-btn').addEventListener('click', close);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) close(); });
    }

    function setLocation() {
        if (locCache) { if (locEl) locEl.textContent = locCache; return; }
        if (locEl) locEl.textContent = 'locating…';
        try {
            fetch('https://checkip.me/json').then(function (r) { return r.json(); }).then(function (d) {
                var parts = [];
                if (d && d.city) parts.push(d.city);
                if (d && (d.region_code || d.region) && !d.city) parts.push(d.region || d.region_code);
                if (d && d.country) parts.push(d.country);
                locCache = parts.join(', ') || 'unknown';
                if (locEl) locEl.textContent = locCache;
            }).catch(function () { locCache = 'unknown'; if (locEl) locEl.textContent = locCache; });
        } catch (e) { locCache = 'unknown'; if (locEl) locEl.textContent = locCache; }
    }

    function show(type, payload) {
        build();
        var kind = type === 'SQLi' ? 'SQL Injection Blocked' : 'XSS Blocked';
        var typeEl = overlay.querySelector('#shg-type');
        if (typeEl) typeEl.textContent = kind;
        var txt = esc(payload);
        if (txt.length > 180) txt = txt.slice(0, 180) + '…';
        if (payloadEl) payloadEl.textContent = txt;
        setLocation();
        open = true;
        lastAt = Date.now();
        prevFocus = document.activeElement;
        prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        overlay.hidden = false;
        requestAnimationFrame(function () { overlay.classList.add('show'); });
        playSounds();
        var btn = overlay.querySelector('.shg-btn');
        if (btn) setTimeout(function () { try { btn.focus(); } catch (e) {} }, 60);
        document.addEventListener('visibilitychange', onVisibility);
    }

    function onVisibility() {
        if (!open) return;
        if (document.hidden) { stopSounds(); }
        else { playSounds(); }
    }

    function close() {
        if (!open || !overlay) return;
        open = false;
        overlay.classList.remove('show');
        stopSounds();
        document.documentElement.style.overflow = prevOverflow;
        document.removeEventListener('visibilitychange', onVisibility);
        setTimeout(function () { if (overlay && !open) overlay.hidden = true; }, 320);
        try { if (prevFocus && prevFocus.focus) prevFocus.focus(); } catch (e) {}
    }

    function detect(v) {
        if (!v) return null;
        var cands = [v];
        try { var dec = decodeURIComponent(v); if (dec !== v) cands.push(dec); } catch (e) {}
        try { var b = atob(v); if (b && b !== v) cands.push(b); } catch (e) {}
        for (var i = 0; i < cands.length; i++) {
            if (XSS.test(cands[i])) return 'XSS';
            if (SQLI.test(cands[i])) return 'SQLi';
        }
        return null;
    }

    function isField(el) {
        return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable === true);
    }

    function valueOf(el) {
        return el.isContentEditable ? (el.textContent || '') : (el.value || '');
    }

    function mark(el) {
        if (!el) return;
        el.classList.remove('shg-flagged');
        void el.offsetWidth;
        el.classList.add('shg-flagged');
        setTimeout(function () { if (el) el.classList.remove('shg-flagged'); }, 700);
    }

    function block(el, type, payload, showIt) {
        mark(el);
        try {
            if (el.isContentEditable) el.textContent = '';
            else el.value = '';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        } catch (e) {}
        if (showIt && !open) show(type, payload);
    }

    document.addEventListener('input', function (e) {
        var el = e.target;
        if (!isField(el)) return;
        var v = valueOf(el);
        if (!v) return;
        var t = detect(v);
        if (!t) return;
        var showIt = !open && (Date.now() - lastAt > 1200);
        block(el, t, v, showIt);
    }, true);

    document.addEventListener('paste', function (e) {
        var el = e.target;
        if (!isField(el)) return;
        var cd = e.clipboardData || window.clipboardData;
        var text = cd ? cd.getData('text') : '';
        var t = detect(text);
        if (!t) return;
        e.preventDefault();
        e.stopPropagation();
        block(el, t, text, !open);
    }, true);

    document.addEventListener('submit', function (e) {
        var form = e.target;
        if (!form || form.tagName !== 'FORM') return;
        var fields = form.querySelectorAll('input,textarea,[contenteditable]');
        for (var i = 0; i < fields.length; i++) {
            var v = valueOf(fields[i]);
            var t = detect(v);
            if (t) {
                e.preventDefault();
                e.stopImmediatePropagation();
                block(fields[i], t, v, !open);
                return;
            }
        }
    }, true);
})();
