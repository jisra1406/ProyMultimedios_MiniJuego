// Script de compresión de audios WAV/FLAC pesados a MP3
// Ejecutar con: node scripts/compress-audio.js

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

// Solo comprimir los archivos que son WAV o FLAC y pesan más de 1MB
const targets = fs.readdirSync(AUDIO_DIR)
  .filter(f => /\.(wav|flac)$/i.test(f))
  .map(f => ({
    input: path.join(AUDIO_DIR, f),
    output: path.join(AUDIO_DIR, f.replace(/\.(wav|flac)$/i, '.mp3')),
    name: f
  }));

if (targets.length === 0) {
  console.log('No hay archivos WAV/FLAC para comprimir.');
  process.exit(0);
}

console.log(`\n🎵 Comprimiendo ${targets.length} archivos de audio a MP3 (128kbps)...\n`);

let completed = 0;

function processNext(index) {
  if (index >= targets.length) {
    console.log('\n✅ ¡Compresión completada! Todos los archivos MP3 han sido generados en public/audio/');
    console.log('\n📝 NEXT STEP: Actualiza src/utils/audio.js para usar las rutas .mp3 en lugar de .wav/.flac');
    return;
  }

  const { input, output, name } = targets[index];
  const inputSizeMB = (fs.statSync(input).size / 1024 / 1024).toFixed(1);

  process.stdout.write(`[${index + 1}/${targets.length}] ${name} (${inputSizeMB} MB) → MP3... `);

  ffmpeg(input)
    .audioCodec('libmp3lame')
    .audioBitrate(128)
    .audioChannels(2)
    .audioFrequency(44100)
    .output(output)
    .on('end', () => {
      const outputSizeMB = (fs.statSync(output).size / 1024 / 1024).toFixed(1);
      console.log(`✅ ${outputSizeMB} MB`);
      processNext(index + 1);
    })
    .on('error', (err) => {
      console.log(`❌ Error: ${err.message}`);
      processNext(index + 1);
    })
    .run();
}

processNext(0);
