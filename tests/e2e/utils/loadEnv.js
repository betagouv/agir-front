import fs from 'fs';
import dotenv from 'dotenv';

const loadDotenv = filePath => {
    if (fs.existsSync(filePath)) {
        dotenv.config({ path: filePath });
        return true;
    } else {
        return false;
    }
};
export default async function (config) {
    loadDotenv('.env.local');
}
