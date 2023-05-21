import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('analytics')
export class AppController {
  analyticsService: any;
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'analytics_postEvent' })
  @Post()
  async createAnalyticsEvent(
    @Body('userId') userId: string,
    @Body('page') page: string,
    @Body('ipAddress') ipAddress: string,
    @Body('referrer') referrer: string,
    @Body('userAgent') userAgent: string,
  ): Promise<any> {
    try {
      const event = await this.appService.createAnalyticsEvent(userId, page, ipAddress, referrer, userAgent);
      return { message: 'Analytics event created', event };
    } catch (error) {
      return { message: 'Failed to create analytics event' };
    }
  }

  @MessagePattern({ cmd: 'analytics_getEvent' })
  @Get()
  async getAnalyticsEvents(): Promise<any> {
    const events = await this.appService.getAnalyticsEvents();
    return { count: events.length, events };
  }
  
}
