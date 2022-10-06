import fs from 'fs';
import { IConvertStrategy } from './convert_strategy';
export class ImageToAsciiService {
    imagePath: string;
    converter: IConvertStrategy;
    constructor(imagePath: string, converter: IConvertStrategy) {
        this.imagePath = imagePath;
        this.converter = converter;
    }

    public convert(): void {
        const Jimp = require('jimp');
        Jimp.read(this.imagePath, (err: any, img: any) => {
            if (err) {
                console.log(err);
            } else {
                img.resize(100, 100);
                img.grayscale();
                img.getBuffer(Jimp.MIME_PNG, (err: any, buffer: any) => {
                    if (err) {
                        console.log(err);
                    } else {
                        fs.writeFileSync(`output.png`, buffer);
                    }
                });
                img.scan(
                    0,
                    0,
                    img.bitmap.width,
                    img.bitmap.height,
                    (x: number, y: number, idx: number) => {
                        const red = img.bitmap.data[idx + 0];
                        const green = img.bitmap.data[idx + 1];
                        const blue = img.bitmap.data[idx + 2];
                        const alpha = img.bitmap.data[idx + 3];
                        const grayScale = (red + green + blue) / 3;
                        const ascii = this.converter.convert(grayScale);
                        process.stdout.write(ascii);
                    },
                );
            }
        });
    }
}
