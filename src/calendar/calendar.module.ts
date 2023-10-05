import { Module } from '@nestjs/common';
import { ScheduleController } from './calendar.controller';

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [],
})
export class CalendarModule {}
