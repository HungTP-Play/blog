import { GrayScaleToAsciiReverse } from './image-to-ascii/convert_strategy';
import { ImageToAsciiService } from './image-to-ascii/service';

function main() {
    const convertStrategy = new GrayScaleToAsciiReverse();
    const service = new ImageToAsciiService('images/aws.jpg', convertStrategy);
    service.convert();
}

main();
