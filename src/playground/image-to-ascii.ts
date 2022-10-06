import fs from 'fs';
export function grayScaleToAscii(scale: number): string {
    if (scale >= 0 && scale <= 25) {
        return '@';
    } else if (scale > 25 && scale <= 50) {
        return '#';
    } else if (scale > 50 && scale <= 75) {
        return '+';
    } else if (scale > 75 && scale <= 100) {
        return '-';
    } else {
        return ' ';
    }
}

export function grayScaleToAsciiReverse(scale: number): string {
    if (scale >= 0 && scale <= 25) {
        return ' ';
    } else if (scale > 25 && scale <= 50) {
        return '-';
    } else if (scale > 50 && scale <= 75) {
        return '+';
    } else if (scale > 75 && scale <= 100) {
        return '#';
    } else {
        return '@';
    }
}

/**
 * Converts an image to ASCII art in specified
 * @param image
 * @param width
 * @param height
 */
export function imageToAscii(
    image: string,
    width: number,
    height: number,
): void {
    const Jimp = require('jimp');
    Jimp.read(image, (err: any, img: any) => {
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
                    const ascii = grayScaleToAscii(grayScale);
                    process.stdout.write(ascii);
                },
            );
        }
    });
}

imageToAscii('../images/value_proposition_design.jpg', 100, 100);
