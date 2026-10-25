import assert from 'node:assert/strict';
const origin=process.env.APPLIORY_TEST_URL||'http://localhost:3000';
for(const path of ['/','/tool','/checklists','/checklists/job','/guides','/how-it-works','/about','/contact','/privacy','/terms','/faq','/api/health','/api/templates']) { const r=await fetch(origin+path); assert.equal(r.status,200,path); console.log('PASS',path); }
for(const path of ['/login','/signup','/dashboard']) { const r=await fetch(origin+path,{redirect:'manual'}); assert.ok([307,308].includes(r.status),path); assert.ok(r.headers.get('location').endsWith('/tool')); }
const checklist=(await (await fetch(origin+'/api/templates/job')).json()).data;
const body={checklist:{title:'My pack',items:checklist.items},documents:[]};
let r=await fetch(origin+'/api/validate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});assert.equal(r.status,200); assert.equal((await r.json()).data.status,'Not ready');
r=await fetch(origin+'/api/validate',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});assert.equal(r.status,400);
r=await fetch(origin+'/api/validate',{method:'POST',headers:{Origin:'https://untrusted.example','Content-Type':'application/json'},body:'{}'});assert.equal(r.status,403);
r=await fetch(origin+'/api/audits');assert.equal(r.status,404);
console.log('PASS guest redirects, stateless validation, invalid input, origin protection, removed accounts');
