import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const files = readdirSync('dist', {recursive:true}).filter(file => file.endsWith('.html'));
test('every generated page has an English document, title and preview noindex', () => {
 assert.ok(files.length >= 20, 'Build the complete catalog before testing');
 for (const file of files) { const html = readFileSync(join('dist',file),'utf8'); assert.match(html,/<html lang="en"/,file); assert.match(html,/<title>[^<]+<\/title>/,file); assert.match(html,/name="robots" content="noindex, nofollow"/,file); }
});
test('all generated internal links and local asset URLs resolve', () => {
 const missing=[];
 for(const file of files){const html=readFileSync(join('dist',file),'utf8'); for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){ const path=decodeURIComponent(match[1]); if(path.startsWith('//')) continue; const dest=join('dist',path); if(!existsSync(dest)&&!existsSync(join(dest,'index.html'))) missing.push(`${file}: ${path}`); }}
 assert.deepEqual(missing,[]);
});
test('reference tracking scripts and remote form targets are absent', () => {
 for(const file of files){const html=readFileSync(join('dist',file),'utf8'); assert.doesNotMatch(html,/<script[^>]+src="https?:/i,file); assert.doesNotMatch(html,/<form[^>]+action="https?:/i,file); }
});
