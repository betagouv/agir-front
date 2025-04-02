import { writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(await readFile(__dirname + '/../package.json', 'utf-8'));
const version = packageJson.version;

writeFileSync(__dirname + '/../dist/version.json', JSON.stringify({ version }, null, 2));
console.log('✅ version.json généré avec succès !');
