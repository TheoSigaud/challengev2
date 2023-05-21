// src/analytics/analytics.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post()
    async createAnalyticsEvent(
        @Body('userId') userId: string,
        @Body('page') page: string,
        @Body('ipAddress') ipAddress: string,
        @Body('referrer') referrer: string,
        @Body('userAgent') userAgent: string,
    ): Promise<any> {
        try {
            const event = await this.analyticsService.createAnalyticsEvent(userId, page, ipAddress, referrer, userAgent);
            return { message: 'Analytics event created', event };
        } catch (error) {
            return { message: 'Failed to create analytics event' };
        }
    }

    @Get()
    async getAnalyticsEvents(): Promise<any> {
        const events = await this.analyticsService.getAnalyticsEvents();
        return { count: events.length, events };
    }
}
