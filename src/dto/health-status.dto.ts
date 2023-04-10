import { ApiProperty } from '@nestjs/swagger';

export class HealthStatusDTO {
  @ApiProperty()
  message: string;
}
