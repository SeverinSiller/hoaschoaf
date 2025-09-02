// scripts/after-build.cjs
const fs = require('fs');
const src = 'docs/index.html';
const dest = 'docs/404.html';

if (!fs.existsSync(src)) {
  console.error('Fehlt: ' + src);
  process.exit(0); // nicht crashen, nur überspringen
}
fs.copyFileSync(src, dest);
console.log('Copied docs/index.html -> docs/404.html');
