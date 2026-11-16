(function(){
            var shSoundOn=true;try{shSoundOn=localStorage.getItem('sh_sound')!=='0';}catch(e){}
            function shMake(src,loop,vol){try{var a=new Audio();a.src=src;a.preload='auto';a.loop=!!loop;a.volume=vol;return a;}catch(e){return null;}}
            var shHeart=shMake('heart-beat.mp3',true,0.85);
            var shLaugh=shMake('dragon-studio-creepy-laugh-2-401714.mp3',false,0.7);
            var shJingle=shMake('audioatlant-evil-jingle-christmas-horror-trailer-short-2-635739.mp3',false,0.5);
            var shPrimed=false;
            function shPrime(){if(shPrimed)return;shPrimed=true;try{[shHeart,shLaugh,shJingle].forEach(function(a){if(!a)return;var v=a.volume;a.volume=0.001;var p=a.play();var restore=function(){try{a.pause();a.currentTime=0;a.volume=v;}catch(e){}};if(p&&p.then){p.then(restore,function(){try{a.volume=v;}catch(e){}});}else{restore();}});}catch(e){}}
            function shPlay(a,reset,vol){if(!a||!shSoundOn)return;try{if(typeof vol==='number')a.volume=vol;if(reset)a.currentTime=0;var p=a.play();if(p&&p.catch)p.catch(function(){});}catch(e){}}
            function shStop(a){if(!a)return;try{a.pause();}catch(e){}}
            function shSetSound(on){shSoundOn=on;try{localStorage.setItem('sh_sound',on?'1':'0');}catch(e){}var b=document.getElementById('sound-toggle');if(b)b.setAttribute('aria-pressed',on?'true':'false');if(!on){shStop(shHeart);shStop(shLaugh);shStop(shJingle);}}
            var t=document.querySelector('.nav-toggle'),n=document.getElementById('primary-nav');if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o?'true':'false')});n.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){n.classList.remove('open');t.setAttribute('aria-expanded','false')})})}            var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
            var gf=document.getElementById('gate-form'),ga=document.getElementById('gate-answer'),gr=document.getElementById('gate-result'),gp=document.getElementById('gate-panel'),gw=document.getElementById('gate-welcome'),gcl=document.getElementById('gate-channel'),TG=gcl?gcl.getAttribute('href'):'https://t.me/+7dfzGPIpcaQ4NGE0',tgTimer=null;
            function unlock(){gr.textContent='The gate opens. You are able to join.';gr.style.color='#7dff9e';ga.value='';ga.disabled=true;var b=gf.querySelector('button');if(b){b.disabled=true;b.textContent='Unlocked';}if(gp){gp.classList.remove('shake');gp.classList.add('gate-success');}if(gw){gw.hidden=false;requestAnimationFrame(function(){gw.classList.add('visible');});}}
            if(gf&&ga&&gr){try{if(sessionStorage.getItem('sh_gate')==='1')unlock();}catch(ex){}
            gf.addEventListener('submit',function(e){e.preventDefault();var v=(ga.value||'').trim().toLowerCase().replace(/[^a-z]/g,'');var ok=(v==='crimsoneclipse');if(ok){try{sessionStorage.setItem('sh_gate','1');}catch(ex){}unlock();shPrime();shPlay(shJingle,true);if(gw){gw.scrollIntoView({behavior:'smooth',block:'nearest'});}clearTimeout(tgTimer);tgTimer=setTimeout(function(){try{sessionStorage.removeItem('sh_gate');window.location.assign(TG);}catch(ex){}},2500);}else{gr.textContent='Incorrect. The clues remain unseen.';gr.style.color='#cc0011';ga.value='';ga.focus();if(gp){gp.classList.remove('shake');void gp.offsetWidth;gp.classList.add('shake');}}});}
            function lockGate(){clearTimeout(tgTimer);tgTimer=null;try{sessionStorage.removeItem('sh_gate');}catch(ex){}if(!gf||!ga)return;gf.reset();ga.disabled=false;ga.value='';var b=gf.querySelector('button');if(b){b.disabled=false;b.textContent='Unlock';}if(gp)gp.classList.remove('gate-success');if(gw){gw.hidden=true;gw.classList.remove('visible');}if(gr){gr.textContent='';gr.style.color='';}}
            window.addEventListener('pagehide',function(){clearTimeout(tgTimer);try{sessionStorage.removeItem('sh_gate');}catch(ex){}});
            window.addEventListener('pageshow',function(e){if(e.persisted)lockGate();});
            if(gcl){gcl.addEventListener('click',function(){try{sessionStorage.removeItem('sh_gate');}catch(ex){}});}
            var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,items=document.querySelectorAll('.reveal');if(r||!('IntersectionObserver'in window)){items.forEach(function(e){e.classList.add('visible')})}else{var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}})},{threshold:.12});items.forEach(function(e){o.observe(e)})}
            var pop=document.getElementById('eye-pop');
            if(pop){
                var popText=pop.querySelector('.eye-pop-text'),eyeImg=pop.querySelector('.eye-wrap img'),hideTimer=null,blinkTimer=null,nextTimer=null,dimTimer=null,popVisible=false,ip=null,geo=null,isVpn=false,vpnType='';
                var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                var startTime=Date.now(),visits=1,battery=null;
                try{visits=(parseInt(localStorage.getItem('sh_visits')||'0',10)||0)+1;localStorage.setItem('sh_visits',String(visits));}catch(e){}
                var ua=navigator.userAgent||'';
                var osName=/Windows/i.test(ua)?'Windows':/iPhone|iPad|iPod/i.test(ua)?'iOS':/Android/i.test(ua)?'Android':/Mac OS X/i.test(ua)?'macOS':/Linux/i.test(ua)?'Linux':'';
                var browserName=/Edg\//.test(ua)?'Edge':/OPR\//.test(ua)?'Opera':/Chrome\//.test(ua)?'Chrome':/Firefox\//.test(ua)?'Firefox':/Safari\//.test(ua)?'Safari':'';
                if(navigator.getBattery){try{navigator.getBattery().then(function(b){battery=b;},function(){});}catch(e){}}
                var generic=['We are watching you.','We see you.','You are not alone.','The eye never sleeps.','We are seeing you.','Do not look away.','You came further than most.','The void is aware of you.','Still here? We noticed.','I can see you.'];
                var idleLines=['You stopped moving. We noticed.','The silence is loud, isn\'t it?','Stillness. We see you better when you are still.','You are hesitating. Good.','No movement. No escape.','Breathe. We are counting them.'];
                var vpnRegex=/vpn|proxy|tor exit|m247|nordvpn|expressvpn|surfshark|cyberghost|private internet|mullvad|ipvanish|proton ?vpn|windscribe|hotspot shield|digitalocean|vultr|linode|hetzner|ovh|contabo|leaseweb|colocrossing|choopa|amazon|aws|google cloud|microsoft azure|oracle cloud|alibaba cloud|hosting|datacenter|data center|vps/i;
                function pick(a){return a[Math.floor(Math.random()*a.length)];}
                function pad2(n){return (n<10?'0':'')+n;}
                function ordinal(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}
                function markVpn(name){isVpn=true;if(name)vpnType=name;}
                function tzCheck(tz){try{if(!tz)return;var local=Intl.DateTimeFormat().resolvedOptions().timeZone||'';if(!local||/^(Etc|UTC)/i.test(local))return;if(local===tz)return;var lp=local.split('/')[0],tp=tz.split('/')[0];if(lp&&tp&&lp!==tp)markVpn('timezone mismatch');}catch(e){}}
                function setData(d){if(!d)return;if(d.ip&&/^[0-9a-fA-F:.]+$/.test(d.ip))ip=d.ip;var city=d.city||d.cityName||'';var region=d.region||d.regionName||d.region_code||'';var country=d.country||d.country_name||d.countryName||d.country_code||'';if(city||region||country)geo={city:city,region:region,country:country};var c=d.connection||{};var org=((c.org||'')+' '+(c.isp||'')+' '+(d.org||'')+' '+(d.isp||'')+' '+(d.organisation||'')+' '+(d.operator||'')).toLowerCase();if(org&&vpnRegex.test(org))markVpn(c.org||c.isp||d.isp||'VPN');var tz=d.timezone;if(tz&&typeof tz==='object')tz=tz.id||'';if(!tz&&d.location&&d.location.timezone)tz=d.location.timezone;if(tz)tzCheck(tz);}
                function loadData(){
                    fetch('https://checkip.me/json').then(function(r){return r.json();}).then(function(d){if(!d||!d.ip)throw 0;setData({ip:d.ip,city:d.city,region:d.region,country:d.country,isp:d.isp,org:d.organisation,timezone:d.timezone});if(d.vpn||d.proxy||d.tor||d.hosting)markVpn(d.operator||d.type||'VPN');}).catch(function(){
                        fetch('https://ipwho.is/').then(function(r){return r.json();}).then(function(d){if(d&&d.success!==false){setData(d);}else{throw 0;}}).catch(function(){
                            fetch('https://api.ipify.org?format=json').then(function(r){return r.json();}).then(setData).catch(function(){});
                        });
                    });
                    fetch('https://www.unblockmaster.com/api/v1/ip').then(function(r){return r.json();}).then(function(d){if(!d)return;if(d.is_vpn)markVpn(d.provider||'VPN');if(!ip&&d.ip)setData({ip:d.ip,city:d.city,country:d.country,provider:d.provider});}).catch(function(){});
                    fetch('https://ipsnapshot.com/api/ip/self').then(function(r){return r.json();}).then(function(d){var x=d&&d.data;if(!x)return;if(x.is_vpn||x.is_tor||x.is_datacenter)markVpn(x.isp||'VPN');if(!ip&&d.ip)setData({ip:d.ip,city:x.city,region:x.region,country:x.country,isp:x.isp});}).catch(function(){});
                }
                loadData();
                function ipMsg(){var f=['Your IP is '+ip,'I see you, '+ip,'We traced you to '+ip,'You cannot hide. '+ip,'Signal locked: '+ip,'We found you at '+ip];return pick(f);}
                function vpnMsg(){var f=['You are so afraid. Hiding behind a VPN?','VPN detected. You fear being seen.','A proxy? We still see you.','You think a VPN hides you from us?','So afraid you use a VPN. We noticed.','Your proxy betrays you. Still watching.','You cannot escape us with a VPN.'];return pick(f);}
                function locMsg(){var city=geo&&geo.city,region=geo&&geo.region,country=geo&&geo.country;var f=[];
                    if(city&&country)f=f.concat(['I know where you are. '+city+', '+country+'.','We see you in '+city+', '+country+'.','You cannot hide in '+city+', '+country+'.','Hello, '+city+'. We noticed.']);
                    if(city&&region&&region!==city)f=f.concat(['Signal traced to '+city+', '+region+'.','Still in '+city+'? We are close.']);
                    if(!city&&country)f=f.concat(['Welcome, visitor from '+country+'.','We know your country. '+country+'.']);
                    if(!f.length)f=generic;
                    return pick(f);}
                function timeLines(){var d=new Date(),hh=d.getHours(),mm=d.getMinutes(),t=pad2(hh)+':'+pad2(mm),a=[];if(hh<5){a=a.concat(['Why are you awake at '+t+'?','It is '+t+'. Nothing good happens now.','The hour is '+t+'. We are awake too.']);}else if(hh>=23){a=a.concat(['It is '+t+'. You should be asleep.','Late again. '+t+'. We noticed.']);}else{a=a.concat(['It is '+t+'. Time is running out.','Only '+t+'. The night is young.']);}return a;}
                function osLines(){var m={Windows:['Windows. So predictable.','A Windows machine. How fragile.'],macOS:['Apple could not protect you.','macOS. A pretty cage.'],Linux:['Linux. Still not hidden.','You thought Linux kept you safe.'],Android:['Android. We have been inside it.','Your phone knows us.'],iOS:['You feel safe in Apple. You are not.','That little phone betrays you.']};return (osName&&m[osName])||[];}
                function browserLines(){var m={Chrome:['Chrome. We see through it.','Everything Chrome forgets, we keep.'],Firefox:['Firefox. Privacy is a comfort, not a shield.'],Safari:['Safari. Even here the eye follows.'],Edge:['Edge. Closer to us than you think.'],Opera:['Opera. A mask under a mask.']};return (browserName&&m[browserName])||[];}
                function visitLines(){if(visits<=1)return ['First time. It will not be the last.','A new face. We will remember it.'];if(visits===2)return ['You came back. We knew you would.','Twice now. The descent has begun.'];return ['This is your '+ordinal(visits)+' visit. You keep returning.','Back for the '+ordinal(visits)+' time. It is becoming a habit.'];}
                function dwellLines(){var s=Math.floor((Date.now()-startTime)/1000),a=[];if(s>=600){a.push('You have been here '+Math.floor(s/60)+' minutes. Do you ever leave?');}else if(s>=120){a.push('You have been here '+Math.floor(s/60)+' minutes. We are patient.');}else if(s>=45){a.push('You have been here '+s+' seconds. We are already counting.');}if(s>=30){var pct=0;try{pct=Math.round((window.scrollY+window.innerHeight)/Math.max(1,document.body.scrollHeight)*100);}catch(e){}if(pct>=40&&pct<100)a.push('You have read '+pct+'% of what we left for you.');}return a;}
                function batteryLines(){if(battery&&!battery.charging&&typeof battery.level==='number'&&battery.level<0.2)return ['Your battery is low. You are running out of time.'];return [];}
                function knowsMsg(){var pool=[];pool=pool.concat(timeLines(),osLines(),browserLines(),visitLines(),dwellLines(),batteryLines());if(geo&&geo.city)pool.push('You are in '+geo.city+'. We are closer than that.');if(!pool.length)pool=generic;return pick(pool);}
                var mouseX=-9999,mouseY=-9999,lastActivity=Date.now(),mouseTick=false,idleShown=false;
                function onActivity(){lastActivity=Date.now();idleShown=false;}
                window.addEventListener('mousemove',function(e){mouseX=e.clientX;mouseY=e.clientY;onActivity();if(!mouseTick){mouseTick=true;requestAnimationFrame(updateGlance);}},{passive:true});
                window.addEventListener('scroll',onActivity,{passive:true});
                window.addEventListener('keydown',onActivity,{passive:true});
                window.addEventListener('pointerdown',onActivity,{passive:true});
                window.addEventListener('touchstart',onActivity,{passive:true});
                window.addEventListener('click',onActivity,{passive:true});
                function updateGlance(){mouseTick=false;if(!popVisible||reduceMotion)return;var rect=pop.getBoundingClientRect(),cx=rect.left+rect.width/2,cy=rect.top+rect.height/2,dx=mouseX-cx,dy=mouseY-cy,dist=Math.sqrt(dx*dx+dy*dy)||1;if(dist<95){flee();return;}var max=4.5,f=Math.min(1,dist/420);if(eyeImg)eyeImg.style.transform='translate('+(dx/dist*max*f).toFixed(1)+'px,'+(dy/dist*max*f).toFixed(1)+'px)';}
                var dim=document.getElementById('dim');
                function flashDim(strong){if(!dim||reduceMotion)return;clearTimeout(dimTimer);if(strong){dim.classList.add('strong');}else{dim.classList.remove('strong');}dim.classList.add('show');dimTimer=setTimeout(function(){dim.classList.remove('show');},1500);}
                var soundBtn=document.getElementById('sound-toggle');
                function updateSoundBtn(){if(soundBtn)soundBtn.setAttribute('aria-pressed',shSoundOn?'true':'false');}
                updateSoundBtn();
                function stopHeart(){shStop(shHeart);}
                function startSound(reason){if(!shSoundOn)return;shPlay(shHeart,false);var c=reason==='idle'?1:(isVpn?0.85:0.5);if(Math.random()<c)shPlay(shLaugh,true);}
                if(soundBtn){soundBtn.addEventListener('click',function(){shSetSound(!shSoundOn);updateSoundBtn();if(shSoundOn&&popVisible)shPlay(shHeart,false);});}
                function unlockAudioOnce(){shPrime();if(popVisible)shPlay(shHeart,false);window.removeEventListener('pointerdown',unlockAudioOnce);window.removeEventListener('keydown',unlockAudioOnce);window.removeEventListener('touchstart',unlockAudioOnce);}
                window.addEventListener('pointerdown',unlockAudioOnce,{passive:true});
                window.addEventListener('keydown',unlockAudioOnce,{passive:true});
                window.addEventListener('touchstart',unlockAudioOnce,{passive:true});
                document.addEventListener('visibilitychange',function(){if(document.hidden){shStop(shHeart);}else if(shSoundOn&&popVisible){shPlay(shHeart,false);}});
                function blinkLoop(){if(!popVisible)return;pop.classList.add('blink');setTimeout(function(){pop.classList.remove('blink');},320);blinkTimer=setTimeout(blinkLoop,2600+Math.random()*4800);}
                function showPop(reason){clearTimeout(nextTimer);var txt;if(reason==='idle'){txt=pick(idleLines);}else if(isVpn){txt=(Math.random()<0.8)?vpnMsg():knowsMsg();}else{var roll=Math.random();if(roll<0.34){txt=knowsMsg();}else if(geo&&roll<0.6){txt=locMsg();}else if(ip&&roll<0.82){txt=ipMsg();}else{txt=pick(generic);}}popText.textContent=txt;var w=pop.offsetWidth||220,h=pop.offsetHeight||56,top=90,bottom=30;var x=20+Math.random()*Math.max(0,window.innerWidth-w-40);var y=top+Math.random()*Math.max(0,window.innerHeight-h-top-bottom);pop.style.left=x+'px';pop.style.top=y+'px';if(eyeImg)eyeImg.style.transform='';pop.classList.add('show');popVisible=true;flashDim(reason==='idle'||isVpn);startSound(reason);clearTimeout(hideTimer);hideTimer=setTimeout(hidePop,4200);if(!reduceMotion){clearTimeout(blinkTimer);blinkTimer=setTimeout(blinkLoop,900);}}
                function hidePop(){pop.classList.remove('show');popVisible=false;if(eyeImg)eyeImg.style.transform='';clearTimeout(blinkTimer);stopHeart();schedulePop();}
                function flee(){pop.classList.remove('show');popVisible=false;if(eyeImg)eyeImg.style.transform='';clearTimeout(blinkTimer);clearTimeout(hideTimer);stopHeart();scheduleIn(2600+Math.random()*3400);}
                function scheduleIn(ms){clearTimeout(nextTimer);nextTimer=setTimeout(function(){showPop('timer');},ms);}
                function schedulePop(){scheduleIn(9000+Math.random()*15000);}
                setInterval(function(){if(popVisible)return;if(Date.now()-lastActivity>6000&&!idleShown){idleShown=true;showPop('idle');}},1000);
                setTimeout(function(){showPop('timer');},4200);
            }
            var gateEye=document.querySelector('.gate-eye');
            if(gateEye){
                var gateImg=gateEye.querySelector('img'),gateReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches,gx=-9999,gy=-9999,gTick=false,gBlink=null;
                function gateGlance(){gTick=false;if(gateReduced||!gateImg)return;var r=gateEye.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=gx-cx,dy=gy-cy,d=Math.sqrt(dx*dx+dy*dy)||1,max=7,f=Math.min(1,d/380);gateImg.style.transform='translate('+(dx/d*max*f).toFixed(1)+'px,'+(dy/d*max*f).toFixed(1)+'px)';}
                function gateTrack(x,y){gx=x;gy=y;if(!gTick){gTick=true;requestAnimationFrame(gateGlance);}}
                window.addEventListener('mousemove',function(e){gateTrack(e.clientX,e.clientY);},{passive:true});
                window.addEventListener('touchmove',function(e){var t=e.touches&&e.touches[0];if(t)gateTrack(t.clientX,t.clientY);},{passive:true});
                function gateBlinkLoop(){gateEye.classList.add('blink');setTimeout(function(){gateEye.classList.remove('blink');},320);gBlink=setTimeout(gateBlinkLoop,3200+Math.random()*3800);}
                if(!gateReduced)setTimeout(gateBlinkLoop,1600);
            }
        })();
