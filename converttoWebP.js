import fs from 'fs';

import path from 'path';

import sharp from 'sharp';

const inputFolder = 'public'; // Dossier source des images
const outputFolder = 'public'; // Dossier de sortie des images WebP

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du dossier:', err);
    return;
  }
  files
    .filter(file => !file.endsWith('.svg'))
    .forEach(file => {
      const inputFilePath = path.join(inputFolder, file);
      const outputFilePath = path.join(outputFolder, `${path.parse(file).name}.webp`);

      sharp(inputFilePath)
        .toFormat('webp')
        .toFile(outputFilePath, (err, info) => {
          if (err) {
            console.error(`Erreur lors de la conversion de ${file}:`, err);
          } else {
            console.log(`Converti: ${file} -> ${outputFilePath}`);
          }
        });
    });
});
