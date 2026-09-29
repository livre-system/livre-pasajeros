import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

await mkdir('www', { recursive: true });
await cp('index.html', join('www', 'index.html'));
await cp('logo_livre.png', join('www', 'logo_livre.png'));
const html = await readFile('index.html', 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>(.*?)<\/script>/gs)].map((match) => match[1]).join('\n');
await writeFile('/tmp/livre-pasajeros-inline.js', scripts);
console.log('Web bundle prepared in www/');
