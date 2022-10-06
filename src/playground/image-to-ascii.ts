import { GrayScaleToBinary } from './image-to-ascii/convert_strategy';
import { ImageToAsciiService } from './image-to-ascii/service';

function main() {
    const service = new ImageToAsciiService(
        'images/aws.jpg',
        new GrayScaleToBinary(),
    );

    service.convert();
}

main();
