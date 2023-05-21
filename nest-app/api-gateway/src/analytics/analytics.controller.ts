import { Controller, Post, Get, Inject, Param, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('analytics')
export class AnalyticsController {

  constructor(@Inject('ANALYTICS_SERVICE') private client: ClientProxy) {}


  @Get('')
  getAnalytics() {
    return this.client.send({ cmd: 'analytics_get' },{});
  }

  @Post('save')
  saveAnalytics(@Body() analytics:any){
    return this.client.send({ cmd: 'analytics_postEvent' }, analytics);
  }

}