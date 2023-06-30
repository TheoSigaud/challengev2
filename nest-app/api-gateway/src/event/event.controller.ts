import { Controller, Post, Get, Inject, Param, Body, Patch, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('event')
export class EventController {

  constructor(@Inject('EVENT_SERVICE') private client: ClientProxy) {}


  @Get('getCompanies')
  getCompanies(){
    return this.client.send({ cmd: 'event_getCompanies' }, {});
  }

  @Post('saveEventAdmin')
  saveEventAdmin(@Body() event:any){
    return this.client.send({ cmd: 'event_saveEventAdmin' }, event);
  }
  
  @Get('getEventsAdmin')
  getEventsAdmin() {
    return this.client.send({ cmd: 'event_getEventsAdmin' },{});
  }

  @Get('coming')
  getEventsComing() {
    return this.client.send({ cmd: 'event_getEventsComing' },{});
  }

  @Get('me')
  getMyEvents() {
    return this.client.send({ cmd: 'event_getMyEvents' },{});
  }


  @Get(':id')
  getEventById(@Param('id') id: any) {
    return this.client.send({ cmd: 'event_getEventById' }, id );
  }

  @Post('')
  saveEvent(@Body() event:any){
    return this.client.send({ cmd: 'event_saveEvent' },event);
  }

  @Patch(':id')
  updateEvent(@Param('id') id: string, @Body() event:any){
    return this.client.send({ cmd: 'event_updateEvent' },{...event,id});
  }

  @Delete('leave')
  leaveEvent(@Body() leaveEvent:any){
    return this.client.send({ cmd: 'event_leaveEvent' }, leaveEvent);
  }
  

  @Delete(':id')
  deleteEvent(@Param('id') id: string){
    return this.client.send({ cmd: 'event_deleteEvent' },id);
  }

  @Post('join')
  joinEvent(@Body() joinEvent:any){
    return this.client.send({ cmd: 'event_joinEvent' }, joinEvent);
  }

  @Get('getUsersByEvent/:id')
  getUsersByEvent(@Param('id') id:string){
    return this.client.send({ cmd: 'event_getUsersByEvent' }, id);
  }

  @Get('getUserByEvent/:id')
  getUserByEvent(@Param('id') id:string){
    return this.client.send({ cmd: 'event_getUserByEvent' }, id);
  }

}