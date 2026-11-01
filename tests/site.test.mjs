import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const files = readdirSync('dist', {recursive:true}).filter(file => file.endsWith('.html'));
const siteUrl = readFileSync('astro.config.mjs','utf8').match(/site:\s*'([^']+)'/)?.[1];
test('every generated page has an English document, title, canonical and index policy', () => {
 assert.ok(siteUrl, 'astro.config.mjs must declare a site URL');
 assert.ok(files.length >= 20, 'Build the complete catalog before testing');
 for (const file of files) { const html = readFileSync(join('dist',file),'utf8'); assert.match(html,/<html lang="en"/,file); assert.match(html,/<title>[^<]+<\/title>/,file);
   const is404 = file === '404.html';
   assert.match(html, is404 ? /name="robots" content="noindex, nofollow"/ : /name="robots" content="index, follow"/, file);
   assert.ok(html.includes(`<link rel="canonical" href="${siteUrl}`), `${file}: canonical missing or off-site`);
 }
});
test('all generated internal links and local asset URLs resolve', () => {
 const missing=[];
 for(const file of files){const html=readFileSync(join('dist',file),'utf8'); for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){ const path=decodeURIComponent(match[1]); if(path.startsWith('//')) continue; const dest=join('dist',path); if(!existsSync(dest)&&!existsSync(join(dest,'index.html'))) missing.push(`${file}: ${path}`); }}
 assert.deepEqual(missing,[]);
});
test('reference tracking scripts and remote form targets are absent', () => {
 for(const file of files){const html=readFileSync(join('dist',file),'utf8'); assert.doesNotMatch(html,/<script[^>]+src="https?:/i,file); assert.doesNotMatch(html,/<form[^>]+action="https?:/i,file); }
});
