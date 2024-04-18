// delete-multiple-clint-notifications.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMultipleNotificationsDto {
  @ApiProperty({ type: [String] })
  ids: string[];
}
