/* ================= SETTINGS ================= */
/* Get a free access key at https://web3forms.com (enter YOUR email there) and paste it below */
var WEB3FORMS_KEY='5dc9077a-9f04-48f4-9a4c-c645fe7566c4';

/* ================= DATA ================= */
var B=[
{id:'dreams',t:'Your Dreams',s:'Your Dreams',e:'🌙',c:'#5b1e2d',ask:'A dream I have never told anyone…',cards:[
['✈️','See the world','Travelling with no fixed plan, just wonder.','Explorer'],
['☕','A tiny cozy café in mountains','Snow outside, steam in my cup, a corner of my own.','Dreamer'],
['✍️','wake up in a zombie apocalypse','Total chaos, and I still discover how brave I am.','Brave heart'],
['🌊','Get lost on an island','No signal, no schedule, just waves and sunsets.','Free spirit'],
['💃','Dance in rain with your favorite person','Soaked, laughing, and not caring who is watching.','Romantic'],
['🚀','Build something of your own','My name, my vision, my rules.','Go-getter'],
['🌌','See the northern lights','Stand under the sky and just breathe.','Wonder-seeker'],
['🏡','A home full of love','Plants, laughter, and people I adore.','Nurturer']]},
{id:'happy',t:'Your Kind of Happiness',s:'Your Happiness',e:'🌸',c:'#1f4a3a',ask:'The tiny thing that always makes me smile…',cards:[
['🌧️','Rain and soft music','Windows fogged, world on pause.','Cozy heart'],
['🌙','Late-night calls','The kind that go on till 3 AM.','Deep thinker'],
['🎁','Surprises','Small gestures that say "I thought of you".','Sentimental'],
['🌅','Quiet mornings in nature','Just me, birdsong and soft sunlight.','Peaceful soul'],
['😂','Laughing till it hurts','With people who get my madness.','Joyful spirit'],
['🎶','Songs on a long drive','Windows down, volume up.','Free spirit'],
['📚','Getting lost in a good series','"Just one more episode" and suddenly it is 4 AM.','Story lover'],
['🍰','Good food, shared','Dessert first, nobody judging.','Joyful spirit']]},
{id:'places',t:'Places You Belong',s:'Places You Belong',e:'🧭',c:'#1e3556',ask:'The place I feel most like myself is…',cards:[
['🏔️','Mountains','Cold air, big silence, small worries.','Explorer'],
['🏖️','Deserted Island','Just me, the ocean and a sky full of stars.','Dreamer'],
['📖','Haunted House','Creaky floors, whispers and a thrill I secretly love.','Thrill-seeker'],
['🏠','Home with your people','Familiar voices, food, safety.','Nurturer'],
['🌆','City lights at night','Buzzing, alive, full of stories.','Go-getter'],
['🌳','A quiet garden','Green leaves, birdsong, slow thoughts.','Peaceful soul'],
['☕','A cozy café corner','Warm cup, soft music, my notebook.','Cozy heart'],
['🛣️','Somewhere I have never been','New streets, new smells, a new me.','Explorer']]},
{id:'future',t:'Your Future Adventures',s:'Your Adventures',e:'🔮',c:'#4a2a5a',ask:'One adventure I promise myself…',cards:[
['🚗','A spontaneous road trip','No map, great playlist, good company.','Free spirit'],
['🗣️','Explore world and meet strangers','Every stranger has a story I want to hear.','Curious mind'],
['🏙️','Move to a new city','Start fresh and become someone new.','Brave heart'],
['🐶','Adopt a little furry friend','Unlimited cuddles, zero regrets.','Nurturer'],
['🪂','Do something scary','Heart racing, then pure joy.','Brave heart'],
['🎨','Start a new business','My idea, my brand, built with my own hands.','Go-getter'],
['📸','Get a home and cafe in mountains','Cold weather, Nature sound','Peaceful soul'],
['🌍','Travel solo','Prove to myself I can do it all alone.','Brave heart']]},
{id:'love',t:'How You Love',s:'How You Love',e:'💌',c:'#7a4a12',ask:'The way someone loved me best was…',cards:[
['💬','Words that truly mean it','A sincere "I\'m proud of you" melts me.','Word-lover'],
['✉️','Handwritten notes','Ink, paper and a little effort.','Sentimental'],
['⏳','Undivided time','Phone away, eyes and heart present.','Present heart'],
['🎀','Thoughtful little gifts','Not costly, just so me.','Giver'],
['🤗','Long, warm hugs','The kind that fix a bad day.','Affectionate'],
['🍲','Being taken care of','Food, a blanket, "did you eat?"','Caretaker'],
['🎶','A song made for me','Or a playlist that says what words cannot.','Sentimental'],
['🌙','Being missed','A random "thinking of you" text.','Word-lover']]}];
/* shelf layout: 3 shelves, 5 books -> [bookIndex, position 0..1 along the shelf] */
var SH=[[[0,.25],[1,.7]],[[2,.5]],[[3,.28],[4,.72]]];
var A={},cur=null,busy=0,amb=0,mute=0;
B.forEach(function(b){A[b.id]={a:[],note:'',read:0}});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

/* ================= SOUND (Web Audio, no files) ================= */
var ac,master,rev,whiteB,brownB;
function nbuf(d,brown){var n=ac.sampleRate*d,b=ac.createBuffer(1,n,ac.sampleRate),o=b.getChannelData(0),l=0;
 for(var i=0;i<n;i++){var w=Math.random()*2-1;if(brown){l=(l+.02*w)/1.02;o[i]=l*3.5}else o[i]=w}return b}
function C(){
 if(!ac){
  ac=new(window.AudioContext||window.webkitAudioContext)();
  master=ac.createGain();master.gain.value=mute?0:.9;
  var cp=ac.createDynamicsCompressor();master.connect(cp);cp.connect(ac.destination);
  /* small room reverb from a generated impulse */
  rev=ac.createConvolver();var L=ac.sampleRate*2.6,ib=ac.createBuffer(2,L,ac.sampleRate);
  for(var c=0;c<2;c++){var d=ib.getChannelData(c);for(var i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,3.2)}
  rev.buffer=ib;var rg=ac.createGain();rg.gain.value=.5;rev.connect(rg);rg.connect(master);
  whiteB=nbuf(1.5,0);brownB=nbuf(1.5,1);
 }
 if(ac.state=='suspended')ac.resume();return ac}
function out(n,send){n.connect(master);if(send){var g=ac.createGain();g.gain.value=send;n.connect(g);g.connect(rev)}}
/* filtered noise burst: d=duration, ty=filter, f0->f1 sweep, v=volume, a=attack, br=brown noise, am=rasp rate, s=reverb send, t=delay */
function N(o){var c=C(),t=c.currentTime+(o.t||0),s=c.createBufferSource();
 s.buffer=o.br?brownB:whiteB;s.loop=true;
 var f=c.createBiquadFilter();f.type=o.ty||'bandpass';f.Q.value=o.q||1;
 f.frequency.setValueAtTime(o.f0,t);f.frequency.exponentialRampToValueAtTime(o.f1||o.f0,t+o.d);
 var g=c.createGain(),a=o.a||.01;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(o.v,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+o.d);
 s.connect(f);f.connect(g);
 if(o.am){var l=c.createOscillator(),lg=c.createGain();l.frequency.value=o.am;lg.gain.value=o.v*.6;l.connect(lg);lg.connect(g.gain);l.start(t);l.stop(t+o.d)}
 out(g,o.s);s.start(t,Math.random());s.stop(t+o.d)}
/* tone: fr=[start,end?] */
function T(fr,d,v,ty,t,send){var c=C(),st=c.currentTime+(t||0),o=c.createOscillator(),g=c.createGain();
 o.type=ty||'sine';o.frequency.setValueAtTime(fr[0],st);if(fr[1])o.frequency.exponentialRampToValueAtTime(fr[1],st+d);
 g.gain.setValueAtTime(.0001,st);g.gain.linearRampToValueAtTime(v,st+.006);g.gain.exponentialRampToValueAtTime(.0001,st+d);
 o.connect(g);out(g,send||0);o.start(st);o.stop(st+d+.05)}
/* bell / music-box note with inharmonic partials + reverb */
function bell(f,v,t){[[1,1,2.2],[2.01,.4,1.4],[2.76,.22,.9],[4.07,.12,.5]].forEach(function(p){T([p[0]*f],p[2],v*p[1],'sine',t||0,.7)})}
var PENT=[523.25,587.33,659.25,783.99,880];
var S={
 pull:function(){ /* wood-on-wood drag, then a soft thock */
  N({d:.95,ty:'bandpass',f0:160,f1:480,q:.9,v:.55,a:.2,br:1,am:34});
  N({d:.5,ty:'highpass',f0:2500,v:.04,a:.2});
  T([150,55],.22,.55,'sine',.8);N({d:.09,ty:'lowpass',f0:1200,f1:300,v:.4,t:.8,br:1})},
 open:function(){ /* leather creak + page flutter + sparkle */
  N({d:.8,ty:'bandpass',f0:300,f1:620,q:7,v:.1,a:.35});
  for(var i=0;i<6;i++)N({d:.09,ty:'bandpass',f0:2000+i*300,f1:4500,v:.18,t:.3+i*.07,s:.1});
  bell(659.25,.05,.25);bell(987.77,.04,.45)},
 flip:function(){N({d:.3,ty:'bandpass',f0:1400,f1:4000,q:.6,v:.38,a:.05,s:.15});N({d:.18,ty:'lowpass',f0:500,v:.15,br:1})},
 yes:function(){var f=PENT[Math.random()*5|0];bell(f,.22,0);bell(f*1.5,.12,.12);bell(f*2,.08,.24)},
 no:function(){T([240,160],.28,.18,'triangle');N({d:.12,ty:'lowpass',f0:900,f1:300,v:.2,br:1})},
 thud:function(){T([110,45],.3,.6);N({d:.12,ty:'lowpass',f0:700,f1:200,v:.45,br:1})},
 done:function(){[523.25,659.25,783.99,1046.5,1318.5].forEach(function(f,i){bell(f,.16,i*.13)})}};
document.getElementById('snd').onclick=function(){C();mute=!mute;master.gain.value=mute?0:.9;this.textContent=mute?'🔇':'🔊'};

/* ================= SHELVES (3 shelves, 5 books, no scroll) ================= */
var pal=['#6b2a2a','#2c4a3a','#23364f','#5a4426','#3b2a4a','#7a4a22','#2a2a2a','#4a1f2f','#1f4147','#6b5a30','#40301f'];
var cs=document.getElementById('case');
function build(){
 cs.innerHTML='';
 var hdr=document.querySelector('header').offsetHeight+30;
 var rowH=Math.max(96,Math.min(175,Math.floor((innerHeight-hdr-24-12-48-24)/3)));
 for(var s=0;s<3;s++){
  var sh=document.createElement('div'),row=document.createElement('div');
  sh.className='shelf';row.className='row';row.style.height=rowH+'px';sh.append(row);cs.append(sh);
  var pl=document.createElement('div');pl.className='plank';cs.append(pl);
  var sps=SH[s],W=cs.clientWidth-24-20-sps.length*40,used=0,arr=[];
  while(used<W-14){var w=14+(Math.random()*16|0);used+=w;arr.push({w:w,h:Math.round(rowH*(.55+Math.random()*.33)),c:pal[Math.random()*pal.length|0]})}
  sps.forEach(function(p){arr.splice(Math.floor(p[1]*arr.length),0,{w:38,h:Math.round(rowH*.95),c:B[p[0]].c,sp:B[p[0]]})});
  arr.forEach(function(o,k){
   var b=document.createElement('div');b.className='book'+(o.sp?' sp':'');
   b.style.cssText='width:'+o.w+'px;height:'+o.h+'px;background:linear-gradient(90deg,#0007,#fff2 18%,#0000 55%,#0006),'+o.c;
   b.innerHTML='<i style="top:10%"></i><i style="top:15%"></i><i style="bottom:10%"></i>';
   if(o.sp){b.innerHTML+='<span>'+o.sp.s+'</span>';
    (function(i,e){e.onclick=function(){openBook(i,e)}})(B.indexOf(o.sp),b);
    if(A[o.sp.id].read)b.classList.add('read')}
   else if(k==arr.length-1&&Math.random()>.35){b.style.transform='rotate(-11deg)';b.style.transformOrigin='bottom right';b.style.marginLeft='8px'}
   row.append(b)})}
}
build();addEventListener('resize',function(){if(!cur)build()});
for(var i=0;i<16;i++){var d=document.createElement('div');d.className='d';
 d.style.cssText='left:'+Math.random()*100+'vw;top:'+(30+Math.random()*70)+'vh;animation-duration:'+(6+Math.random()*8)+'s;animation-delay:'+Math.random()*8+'s';document.body.append(d)}

/* ================= BOOK ================= */
var ov,bk,pg,anim,idx,el,b;
function TR(x,y,r,sx,sy){return 'perspective(1200px) translate('+x+'px,'+y+'px) rotateY('+r+'deg) scale('+sx+','+sy+')'}
function openBook(i,e){
 if(busy||cur)return;busy=1;b=B[i];el=e;cur=b;S.pull();
 var r=e.getBoundingClientRect();e.style.opacity=0;
 ov=document.createElement('div');ov.className='ov';
 ov.innerHTML='<button id="x" aria-label="close">✕</button><div class="bk"><div class="inner"><div id="pg"></div><div class="cnt" id="cn"></div></div>'+
 '<div class="cv"><div class="f" style="background:linear-gradient(135deg,#fff3,#0004),'+b.c+'"><div class="em">'+b.e+'</div><b>'+b.t+'</b><small>✦ ✦ ✦</small></div><div class="b"></div></div></div>';
 document.body.append(ov);bk=ov.querySelector('.bk');pg=ov.querySelector('#pg');ov.querySelector('#x').onclick=closeBook;
 var W=bk.offsetWidth,H=bk.offsetHeight,dx=r.left+r.width/2-innerWidth/2,dy=r.top+r.height/2-innerHeight/2,sx=r.width/(W*.17),sy=r.height/H;
 requestAnimationFrame(function(){ov.classList.add('on')});
 anim=bk.animate([{transform:TR(dx,dy,-80,sx,sy)},{transform:TR(dx*.4,dy*.3-30,-50,sx*2.2,sy*1.05),offset:.35},{transform:TR(0,0,0,1,1)}],
  {duration:1400,easing:'cubic-bezier(.3,.7,.2,1)',fill:'forwards'});
 anim.onfinish=function(){S.open();ov.querySelector('.cv').classList.add('open');
  idx=Math.min(A[b.id].a.length,b.cards.length);setTimeout(function(){show();busy=0},700)}}
function show(){
 var n=b.cards.length,h;
 ov.querySelector('#cn').textContent=idx<n?'page '+(idx+1)+' of '+n:'the closing page';
 if(idx<n){var c=b.cards[idx];
  h='<div class="em">'+c[0]+'</div><div class="tt">'+c[1]+'</div><div class="tx">'+c[2]+'</div><div class="tag">is this true for you?</div>'+
  '<div class="act"><button class="n" aria-label="no" onclick="ans(0)">✕</button><button class="y" aria-label="yes" onclick="ans(1)">❤</button></div>'}
 else{var t={};A[b.id].a.forEach(function(v,i){if(v)t[b.cards[i][3]]=1});
  var ch=Object.keys(t).map(function(x){return'<span>'+x+'</span>'}).join('')||'<span>a mystery 🌙</span>';
  h='<div class="em">'+b.e+'</div><div class="tt">This book says you are…</div><div class="chips">'+ch+'</div><div class="tag" style="margin-top:6px">'+b.ask+'</div>'+
  '<textarea id="nt" placeholder="write here, just for me…" oninput="A[b.id].note=this.value">'+esc(A[b.id].note)+'</textarea><button class="btn" onclick="closeBook()">Close the book 📖</button>'}
 pg.innerHTML=h}
function ans(v){
 if(busy)return;busy=1;A[b.id].a[idx]=v;v?S.yes():S.no();
 if(v){var f=document.createElement('div');f.textContent='❤';
  f.style.cssText='position:absolute;font-size:90px;color:#c93a54;left:50%;top:40%;margin:-45px;pointer-events:none';
  pg.parentNode.append(f);f.animate([{transform:'scale(.3)',opacity:1},{transform:'scale(1.5) translateY(-60px)',opacity:0}],{duration:800}).onfinish=function(){f.remove()}}
 setTimeout(function(){S.flip();
  pg.animate([{transform:'perspective(900px) rotateY(0)',opacity:1},{transform:'perspective(900px) rotateY(-95deg)',opacity:.2}],{duration:380,easing:'ease-in'}).onfinish=function(){
   idx++;show();
   pg.animate([{transform:'perspective(900px) rotateY(70deg)',opacity:.2},{transform:'perspective(900px) rotateY(0)',opacity:1}],{duration:420,easing:'ease-out'}).onfinish=function(){busy=0}}},v?450:150)}
function closeBook(){
 if(busy||!cur)return;
 var nt=document.getElementById('nt');if(nt)A[b.id].note=nt.value;
 if(A[b.id].a.length>=b.cards.length)A[b.id].read=1;
 busy=1;S.flip();
 var cv=ov.querySelector('.cv');cv.style.transition='transform 1s,opacity .2s';cv.classList.remove('open');
 setTimeout(function(){S.pull();anim.reverse();ov.classList.remove('on');
  anim.onfinish=function(){ov.remove();el.style.opacity=1;if(A[b.id].read)el.classList.add('read');
   el.animate([{transform:'translateY(-18px)'},{transform:'translateY(0)'}],{duration:350});
   S.thud();cur=null;busy=0;prog()}},1000)}
function prog(){
 var n=B.filter(function(x){return A[x.id].read}).length;
 document.getElementById('bar').textContent='📚 '+n+' / 5 books read';
 if(n==B.length){document.getElementById('sub').style.display='none';document.getElementById('fin').style.display='inline-block'}}
addEventListener('keydown',function(e){if(e.key=='Escape'&&cur)closeBook()});

/* ================= SUMMARY (fixed: all books included) ================= */
function txt(){
 var o='🌙 THE LIBRARY OF YOU — her answers\n';
 B.forEach(function(b){var a=A[b.id].a,y=[],n=[];
  b.cards.forEach(function(c,i){(a[i]?y:n).push(c[1])});
  o+='\n'+b.e+' '+b.t+'\n❤ '+(y.join(', ')||'-')+'\n✕ '+(n.join(', ')||'-')+'\n✍ '+(A[b.id].note||'-')+'\n'});
 return o}
function summary(){
 var t={},body='';
 B.forEach(function(b){var a=A[b.id].a,y=[],n=[];
  b.cards.forEach(function(c,i){if(a[i]){t[c[3]]=(t[c[3]]||0)+1;y.push(c[0]+' '+c[1])}else n.push(c[1])});
  body+='<h3>'+b.e+' '+b.t+'</h3><p>❤ '+(y.join(' · ')||'—')+'</p><p class="no">✕ '+(n.join(' · ')||'—')+'</p><p>✍ <i>'+(esc(A[b.id].note)||'—')+'</i></p>'});
 var top=Object.keys(t).sort(function(x,y){return t[y]-t[x]}).slice(0,5);
 var h='<h2>Everything about you 💌</h2><p><i>Your strongest colours:</i></p><div class="chips" style="font-size:20px">'+top.map(function(x){return'<span>'+x+'</span>'}).join('')+'</div>'+body+
 '<p style="margin-top:18px"><button class="btn" onclick="document.getElementById(\'sum\').style.display=\'none\'">Back to library</button></p>';
 document.getElementById('sw').innerHTML=h;
 var s=document.getElementById('sum');s.style.display='block';s.scrollTop=0;S.done();send()}
var lastSent='';
function send(){
 var m=txt();if(m===lastSent||WEB3FORMS_KEY.indexOf('YOUR_')===0)return;
 var body=JSON.stringify({access_key:WEB3FORMS_KEY,subject:'💌 Day 8 · Library of You · her answers',from_name:'Library of You',message:m}),tries=0;
 function retry(){if(++tries<4)setTimeout(go,4000*tries)}
 function go(){fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:body})
  .then(function(r){return r.json()}).then(function(j){if(j&&j.success)lastSent=m;else retry()}).catch(retry)}
 go()}