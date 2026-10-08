'use strict';
const profile = window.PORTFOLIO || {};
const text = (selector, value) => { if (value) document.querySelectorAll(selector).forEach(el => {el.textContent = value;}); };
text('[data-name]', profile.name); text('[data-initials]', profile.initials); text('[data-location]', profile.location); text('[data-introduction]', profile.introduction);
if (profile.name) { document.title = `${profile.name} — Professional Portfolio`; document.querySelector('meta[name="description"]').content = `${profile.name} — ${profile.role || 'All-around professional'} in software development, project management, system integration, multimedia, and virtual assistance.`; }
document.querySelector('#year').textContent = new Date().getFullYear();
if (Array.isArray(profile.skills)) { const skills = document.querySelector('[data-skills]'); skills.replaceChildren(...profile.skills.map(skill => {const tag = document.createElement('span');tag.textContent = skill;return tag;})); }
function safeURL(value) { try {const u = new URL(value);return u.protocol === 'https:' ? u.href : null;}catch{return null;} }
for (const [label, value] of [['GitHub', profile.github], ['LinkedIn', profile.linkedin]]) {const url = safeURL(value);if (url) {const link = document.createElement('a');link.href=url;link.textContent=`${label} ↗`;link.target='_blank';link.rel='noopener noreferrer';document.querySelector('[data-social]').append(link);} }
if (profile.resume && (/^assets\/[a-zA-Z0-9_./-]+\.pdf$/.test(profile.resume) || safeURL(profile.resume))) {const link=document.querySelector('#resume-link');link.href=profile.resume;link.hidden=false;link.setAttribute('download','');}
const menuButton=document.querySelector('.menu-button'),navigation=document.querySelector('#navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded') !== 'true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape' && navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width: 761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{let count=0;document.querySelectorAll('.filter').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});document.querySelectorAll('.work-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});document.querySelector('#filter-status').textContent=`${count} work ${count===1?'sample':'samples'} shown.`;}));
const projects={
 qa:{title:'From issue to resolution',summary:'A repeatable QA workflow that makes findings easier to understand and fixes easier to verify.',steps:['Map the user journey and the expected behavior, including empty states and validation.','Test common actions and edge cases, and record the exact steps to reproduce any issue.','Write a concise report with expected versus actual results, evidence, and impact.','Retest the fix and check related workflows for regressions.']},
 design:{title:'A brand with momentum',summary:'An original concept created for this portfolio. The goal: turn a simple message into a clear, energetic visual.',steps:['Identify the audience, the message, and the action the visual should encourage.','Choose a small color palette and strong typography to create a recognizable direction.','Arrange the layout around one clear focal point with room for the message to breathe.','Adapt the visual for different formats and check readability before handoff.']},
 support:{title:'Organized from the start',summary:'An illustrative workflow for keeping project planning and delivery clear and manageable.',steps:['Clarify the brief, deadlines, requirements, and intended deliverables.','Break the work into specific tasks and organize the supporting files.','Prepare drafts, surface questions early, and keep progress visible.','Review the details and deliver a tidy handoff with clear next steps.']}
};
const dialog=document.querySelector('#project-dialog');let dialogTrigger;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const project=projects[button.dataset.project];dialogTrigger=button;text('#dialog-title',project.title);text('#dialog-summary',project.summary);document.querySelector('#dialog-steps').replaceChildren(...project.steps.map(step=>{const li=document.createElement('li');li.textContent=step;return li;}));dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});dialog.addEventListener('close',()=>dialogTrigger?.focus());
const form=document.querySelector('#contact-form'),status=document.querySelector('#form-status');
const validEmail=typeof profile.email==='string' && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(profile.email);
if(validEmail){document.querySelector('#email-button').hidden=false;document.querySelector('#contact-note').textContent='Prepare email opens your email app with a draft. You review and send it there.';const link=document.createElement('a');link.href=`mailto:${profile.email}`;link.textContent='Email ↗';document.querySelector('[data-social]').append(link);}
function inquiry(){const data=new FormData(form);return `Hi ${profile.name || 'there'},\n\n${data.get('message').trim()}\n\nFrom: ${data.get('name').trim()}\nEmail: ${data.get('email').trim()}`;}
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;if(!validEmail){status.textContent='Use Copy inquiry to prepare your message.';return;}const data=new FormData(form);const subject=`Portfolio inquiry from ${data.get('name').trim()}`;window.location.href=`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiry())}`;status.textContent='Your email app should open with a draft. The message has not been sent.';});
document.querySelector('#copy-message').addEventListener('click',async()=>{if(!form.reportValidity())return;const message=inquiry();try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(message);status.textContent='Inquiry copied. Paste it into your preferred messaging app.';}catch{let output=document.querySelector('#manual-copy');if(!output){output=document.createElement('textarea');output.id='manual-copy';output.readOnly=true;output.setAttribute('aria-label','Inquiry to copy manually');form.append(output);}output.value=message;output.focus();output.select();status.textContent='Select and copy the inquiry below using Ctrl+C or your device’s copy command.';}});

// Decorative motion is optional. No animation libraries or external requests.
(() => {
 const root=document.documentElement;
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
 const control=document.querySelector('#motion-toggle');
 let userPaused=false;
 try {userPaused=localStorage.getItem('portfolio-motion-paused')==='true';} catch {}
 let paused=true,frame=0,roleTimer=0,roleIndex=0;
 const roles=['Developer.','Project manager.','Virtual assistant.','Creative thinker.'];
 const role=document.querySelector('#rotating-role');
 const canvas=document.querySelector('#particle-field');
 const ctx=canvas.getContext('2d');
 let points=[],width=0,height=0,lastTime=0;
 const pointer={x:-1000,y:-1000};
 function resize(){width=window.innerWidth;height=window.innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);const count=width<760?22:44;points=Array.from({length:count},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}));draw(1);}
 function draw(speed){if(!ctx)return;ctx.clearRect(0,0,width,height);for(const p of points){if(!paused){p.x=(p.x+p.vx*speed+width)%width;p.y=(p.y+p.vy*speed+height)%height;}ctx.fillStyle='#b5a1e780';ctx.beginPath();ctx.arc(p.x,p.y,1.3,0,Math.PI*2);ctx.fill();}
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist<120){ctx.strokeStyle=`rgba(139,126,188,${(1-dist/120)*.16})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
  if(finePointer.matches&&!paused)for(const p of points){const dist=Math.hypot(pointer.x-p.x,pointer.y-p.y);if(dist<150){ctx.strokeStyle=`rgba(184,156,255,${(1-dist/150)*.28})`;ctx.beginPath();ctx.moveTo(pointer.x,pointer.y);ctx.lineTo(p.x,p.y);ctx.stroke();}}
 }
 function animate(now){if(paused||document.hidden)return;const speed=lastTime?Math.min((now-lastTime)/16.67,2):1;lastTime=now;draw(speed);frame=requestAnimationFrame(animate);}
 function applyMotion(){paused=userPaused||preference.matches;root.classList.toggle('motion-paused',paused);control.setAttribute('aria-pressed',String(paused));control.textContent=paused?'Enable motion':'Pause motion';control.disabled=preference.matches;control.title=preference.matches?'Your system reduced-motion preference is active.':'';clearInterval(roleTimer);cancelAnimationFrame(frame);lastTime=0;
  if(paused){document.querySelectorAll('.reveal-pending').forEach(el=>{el.classList.remove('reveal-pending');el.classList.add('reveal-visible');});document.querySelectorAll('.button').forEach(el=>{el.style.removeProperty('--mx');el.style.removeProperty('--my');});role.classList.remove('role-changing');draw(1);return;}
  if(!document.hidden){if(ctx)frame=requestAnimationFrame(animate);roleTimer=setInterval(()=>{roleIndex=(roleIndex+1)%roles.length;role.textContent=roles[roleIndex];role.classList.remove('role-changing');void role.offsetWidth;role.classList.add('role-changing');},3000);}
 }
 control.addEventListener('click',()=>{userPaused=!userPaused;try{localStorage.setItem('portfolio-motion-paused',String(userPaused));}catch{}applyMotion();});
 preference.addEventListener('change',applyMotion);
 document.addEventListener('visibilitychange',applyMotion);
 window.addEventListener('resize',resize,{passive:true});
 window.addEventListener('pointermove',event=>{if(!paused&&finePointer.matches){pointer.x=event.clientX;pointer.y=event.clientY;}},{passive:true});
 document.addEventListener('pointerleave',()=>{pointer.x=pointer.y=-1000;});
 document.querySelectorAll('.button').forEach(button=>{
  button.addEventListener('pointermove',event=>{if(paused||!finePointer.matches)return;const r=button.getBoundingClientRect();button.style.setProperty('--mx',`${(event.clientX-r.left-r.width/2)*.045}px`);button.style.setProperty('--my',`${(event.clientY-r.top-r.height/2)*.06}px`);});
  button.addEventListener('pointerleave',()=>{button.style.removeProperty('--mx');button.style.removeProperty('--my');});
  button.addEventListener('click',event=>{if(paused)return;const r=button.getBoundingClientRect();const ripple=document.createElement('span');ripple.className='button-ripple';ripple.setAttribute('aria-hidden','true');ripple.style.left=`${event.detail?event.clientX-r.left:r.width/2}px`;ripple.style.top=`${event.detail?event.clientY-r.top:r.height/2}px`;button.append(ripple);setTimeout(()=>ripple.remove(),650);});
 });
 resize();applyMotion();
 if(!paused&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');entry.target.classList.add('reveal-visible');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.section').forEach(section=>{section.classList.add('reveal-pending');observer.observe(section);});}
})();
