import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { RpcValidationFilter } from './filters/rpc-exception.filter';
import { createEventDto } from './dto/create-event.dto';
import { updateEventDto } from './dto/update-event.dto';
import { joinEventDto } from './dto/join-event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'event_getEvents' })
  getEvents() {
    return this.appService.getEvents();
  }

  @MessagePattern({ cmd: 'event_getEventsComing' })
  getEventsComing() {
    return this.appService.getEventsComing();
  }

  @MessagePattern({ cmd: 'event_getMyEvents' })
  getMyEvents() {
    return this.appService.getMyEvents();
  }


  @MessagePattern({ cmd: 'event_getEventById' })
  getEventById(id:string) {
    return this.appService.getEventById(id);
  }

  @MessagePattern({ cmd: 'event_saveEvent' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  saveEvent(createEvent: createEventDto) {
    return this.appService.saveEvent(createEvent);
  }

  @MessagePattern({ cmd: 'event_updateEvent' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  updateEvent(event: updateEventDto) {
    return this.appService.updateEvent(event);
  }

  @MessagePattern({ cmd: 'event_deleteEvent' })
  @UseFilters(new RpcValidationFilter())
  deleteEvent(id: string) {
    return this.appService.deleteEvent(id);
  }

  @MessagePattern({ cmd: 'event_joinEvent' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  joinEvent(joinEvent :joinEventDto) {
    return this.appService.joinEvent(joinEvent);
  }


  @MessagePattern({ cmd: 'event_getUsersByEvent' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  getUsersByEvent(id:string) {
    return this.appService.getUsersByEvent(id);
  }

}