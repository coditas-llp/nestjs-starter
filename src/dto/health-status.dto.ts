import { ApiProperty } from '@nestjs/swagger';

export class HealthStatusDTO {
  @ApiProperty()
  data: string;
}
