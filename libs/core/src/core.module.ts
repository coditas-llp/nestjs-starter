import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';

@Module({
  providers: [CoreService],
  exports: [CoreService, CustomLoggerModule],
  imports: [CustomLoggerModule],
})
export class CoreModule {}
