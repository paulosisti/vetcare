// schedule.controller.ts
import { Controller, Get, Query, Redirect } from '@nestjs/common';

@Controller('schedule')
export class ScheduleController {
  @Get()
  @Redirect('', 302)
  scheduleEvent(@Query() queryParams) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    const todayDate = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;

    const baseUrl = 'https://www.google.com/calendar/render';
    const calendarId = 'seu-email@gmail.com';
    const params = {
      action: 'TEMPLATE',
      text: queryParams.title || 'Consulta Veterinária',
      details:
        queryParams.description ||
        'Agendamento de consulta por VetCare Application',
      dates: `${queryParams.startDate || todayDate}/${
        queryParams.endDate || todayDate
      }`,
      location: queryParams.location || 'Clínica Parceira',
      sprop: 'name:' + calendarId,
    };
    const queryString = new URLSearchParams(params).toString();
    const scheduleUrl = `${baseUrl}?${queryString}`;

    return { url: scheduleUrl };
  }
}
