export interface IConvertStrategy {
    convert(grayScale: number): string;
}

export class GrayScaleToAscii implements IConvertStrategy {
    convert(grayScale: number): string {
        if (grayScale >= 0 && grayScale <= 25) {
            return '@';
        } else if (grayScale > 25 && grayScale <= 50) {
            return '#';
        } else if (grayScale > 50 && grayScale <= 75) {
            return '+';
        } else if (grayScale > 75 && grayScale <= 100) {
            return '-';
        } else {
            return ' ';
        }
    }
}

export class GrayScaleToAsciiReverse implements IConvertStrategy {
    convert(grayScale: number): string {
        if (grayScale >= 0 && grayScale <= 25) {
            return ' ';
        } else if (grayScale > 25 && grayScale <= 50) {
            return '-';
        } else if (grayScale > 50 && grayScale <= 75) {
            return '+';
        } else if (grayScale > 75 && grayScale <= 100) {
            return '#';
        } else {
            return '@';
        }
    }
}

export class GrayScaleToMatrix implements IConvertStrategy {
    convert(grayScale: number): string {
        if (grayScale >= 0 && grayScale <= 25) {
            return '██';
        } else if (grayScale > 25 && grayScale <= 50) {
            return '▓▓';
        } else if (grayScale > 50 && grayScale <= 75) {
            return '▒▒';
        } else if (grayScale > 75 && grayScale <= 100) {
            return '░░';
        } else {
            return '  ';
        }
    }
}
