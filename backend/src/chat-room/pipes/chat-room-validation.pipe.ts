import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ChatRoomValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value.isPrivate === 'true') value.isPrivate = true;
    else if (value.isPrivate === 'false') value.isPrivate = false;
    else throw new BadRequestException(`${value.isPrivate} isn't boolean type`);
    return value;
  }
}
