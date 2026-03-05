import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDimensions(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        if (buffer[0] === 0xFF && buffer[1] === 0xD8) { // JPEG
            let offset = 2;
            while (offset < buffer.length) {
                const marker = buffer.readUInt16BE(offset);
                offset += 2;
                if (marker >= 0xFFC0 && marker <= 0xFFC3) {
                    offset += 3;
                    const height = buffer.readUInt16BE(offset);
                    offset += 2;
                    const width = buffer.readUInt16BE(offset);
                    return { width, height };
                }
                const length = buffer.readUInt16BE(offset);
                offset += length;
            }
        }
    } catch (_e) { }
    return null;
}

const dir = path.join(__dirname, 'public', 'Photos');
const f1 = path.join(dir, 'AI Mevreon Platform Slide1.jpg');
const f2 = path.join(dir, 'AI Mevreon Platform Slide2.jpg');

console.log('f1:', getDimensions(f1));
console.log('f2:', getDimensions(f2));
