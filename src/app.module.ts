import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TimesheetController } from './timesheet/timesheet.controller';

@Module({
  imports: [],
  controllers: [TimesheetController],
  providers: [],
})
export class AppModule {}
