import { GrayScaleToAscii } from './image-to-ascii/convert_strategy';
import { ImageToAsciiService } from './image-to-ascii/service';

function main() {
    const convertStrategy = new GrayScaleToAscii();
    const service = new ImageToAsciiService(
        'images/astronaut.png',
        convertStrategy,
    );
    service.convert();
}

main();
