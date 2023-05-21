import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AnalyticsData extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    page: string;

    @Prop({ default: Date.now })
    timestamp: Date;

    @Prop({ required: true })
    ipAddress: string;

    @Prop({ required: false })
    referrer: string;

    @Prop({ required: false })
    userAgent: string;
}

export const AnalyticsSchema = SchemaFactory.createForClass(AnalyticsData);
