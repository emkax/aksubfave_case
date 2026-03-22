import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THUMBNAIL_FOLDER = path.join(__dirname, '../../public/thumbnails');

if (!fs.existsSync(THUMBNAIL_FOLDER)) {
    fs.mkdirSync(THUMBNAIL_FOLDER, { recursive: true });
}

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, THUMBNAIL_FOLDER);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

export const upload = multer({ storage });