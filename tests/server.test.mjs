import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {makeServer} from '../scripts/server.mjs';
const server=makeServer();let base;
before(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));base=`http://127.0.0.1:${server.address().port}`;});
after(()=>new Promise(r=>server.close(r)));
test('every internal page and asset link resolves; metadata is present',async()=>{
 const sitemap=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');
 const paths=[...sitemap.matchAll(/<loc>https:\/\/codecrab.net([^<]+)<\/loc>/g)].map(m=>m[1]);assert.equal(paths.length,11);
 const links=new Set();
 for(const p of paths){const res=await fetch(base+p);assert.equal(res.status,200,p);const html=await res.text();assert.match(html,/<h1[ >]/);assert.match(html,/rel="canonical"/);assert.match(html,/name="description"/);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);for(const [,href] of html.matchAll(/(?:href|src)="([^"#]+)"/g))if(href.startsWith('/'))links.add(href);}
 for(const link of links){assert.equal((await fetch(base+link)).status,200,link);}
});
test('unknown pages are 404 and malformed URLs do not crash server',async()=>{const r=await fetch(base+'/not-a-real-page/');assert.equal(r.status,404);assert.match(await r.text(),/escaped/);assert.equal((await fetch(base+'/%ZZ')).status,400);});
test('slash redirects and method handling',async()=>{assert.equal((await fetch(base+'/about',{redirect:'manual'})).status,308);assert.equal((await fetch(base+'/',{method:'POST'})).status,405);});
