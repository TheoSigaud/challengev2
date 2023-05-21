import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalyticsData } from './schemas/analytics.schema';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectModel(AnalyticsData.name)
        private analyticsModel: Model<AnalyticsData>,
    ) { }

    async createAnalyticsEvent(
        userId: string,
        page: string,
        ipAddress: string,
        referrer: string,
        userAgent: string,
    ): Promise<AnalyticsData> {
        const eventData = new this.analyticsModel({
            userId,
            page,
            ipAddress,
            referrer,
            userAgent,
        });

        return eventData.save();
    }

    async getAnalyticsEvents(): Promise<AnalyticsData[]> {
        return this.analyticsModel.find().exec();
    }
}