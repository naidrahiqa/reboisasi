const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'log.txt');

// Customisasi jumlah commit di sini
const MIN_COMMITS = 15;
const MAX_COMMITS = 25;

// Randomize jumlah commit hari ini biar keliatan natural di graph
const commitsToday = Math.floor(Math.random() * (MAX_COMMITS - MIN_COMMITS + 1)) + MIN_COMMITS;

console.log(`[+] Mulai reboisasi... Menanam ${commitsToday} pohon hari ini 🌳`);

// Fungsi helper buat run command
const run = (cmd) => {
  try {
    execSync(cmd, { stdio: 'pipe' });
  } catch (err) {
    console.error(`[-] Gagal menjalankan: ${cmd}`);
    console.error(err.output ? err.output.toString() : err.message);
  }
};

for (let i = 1; i <= commitsToday; i++) {
  const timestamp = new Date().toISOString();
  const randomHex = Math.random().toString(16).slice(2, 10);
  const logContent = `Log entry: ${timestamp} - Hash: ${randomHex}\n`;

  // Write ke log.txt
  fs.appendFileSync(FILE_PATH, logContent);

  // Commit changes
  run('git add .');
  run(`git commit -m "chore: auto sync data ${randomHex} [skip ci]"`);
  
  console.log(`[+] Pohon ke-${i}/${commitsToday} berhasil ditanam.`);
}

console.log('[+] Sedang push ke GitHub...');
// Kamu bisa ganti 'main' ke 'master' kalau pakai master branch
run('git push origin main'); 

console.log('[+] Selesai! GitHub makin ijo 🟩🟩🟩🟩');
