#!/usr/bin/env node
/** Site integrity checks — run before dev/build. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['index.html', 'about.html', 'events.html', 'join.html', 'contact.html'];

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function fail(msg) {
  console.error(`smoke FAIL: ${msg}`);
  process.exit(1);
}

function ok(msg) {
  console.log(`smoke ok: ${msg}`);
}

// ── Chapters data ──
const chaptersSrc = read('js/chapters.js');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(chaptersSrc, ctx);
const chapters = ctx.window.BCA_CHAPTERS;
if (!Array.isArray(chapters) || chapters.length !== 14) {
  fail(`BCA_CHAPTERS must define exactly 14 chapters (found ${chapters?.length ?? 0})`);
}
chapters.forEach((ch, i) => {
  if (!ch.name || !ch.region || !ch.areas || !ch.mailSubject) {
    fail(`Chapter ${i} missing name, region, areas, or mailSubject`);
  }
});
ok('14 chapters in js/chapters.js');

// ── JS syntax ──
for (const file of ['js/chapters.js', 'js/script.js']) {
  try {
    new vm.Script(read(file), { filename: file });
  } catch (e) {
    fail(`${file} parse error: ${e.message}`);
  }
}
ok('JS files parse');

// ── HTML pages ──
for (const page of PAGES) {
  const html = read(page);
  if (!html.includes('css/style.css')) fail(`${page} missing stylesheet`);
  if (!html.includes('js/chapters.js')) fail(`${page} missing chapters.js`);
  if (!html.includes('js/script.js')) fail(`${page} missing script.js`);
  if (html.includes('8 More Chapters')) fail(`${page} still has collapsed +8 chapters placeholder`);
}
ok('all HTML pages link assets and show full chapter list');

// ── Chapter mount points ──
if (!read('index.html').includes('id="chapters-grid-home"')) {
  fail('index.html missing chapters-grid-home');
}
if (!read('contact.html').includes('id="chapters-grid-contact"')) {
  fail('contact.html missing chapters-grid-contact');
}
ok('chapter render targets present');

if (!fs.existsSync(path.join(ROOT, 'images/toghu-pattern.svg'))) {
  fail('images/toghu-pattern.svg missing');
}
ok('toghu pattern asset present');

console.log('smoke: all checks passed');
