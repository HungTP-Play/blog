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

export class GrayScaleToJapanese implements IConvertStrategy {
    convert(grayScale: number): string {
        if (grayScale >= 0 && grayScale <= 25) {
            return '日';
        } else if (grayScale > 25 && grayScale <= 50) {
            return '月';
        } else if (grayScale > 50 && grayScale <= 75) {
            return '火';
        } else if (grayScale > 75 && grayScale <= 100) {
            return '水';
        } else {
            return ' ';
        }
    }
}

export class GrayScaleToBinary implements IConvertStrategy {
    convert(grayScale: number): string {
        if (grayScale >= 0 && grayScale <= 50) {
            return '1';
        } else if (grayScale > 50 && grayScale <= 100) {
            return '0';
        } else {
            return ' ';
        }
    }
}
