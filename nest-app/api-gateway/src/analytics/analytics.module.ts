import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AnalyticsController } from './analytics.controller';

@Module({

    imports: [ConfigModule.forRoot()],
    controllers: [AnalyticsController],
    providers: [{

        provide: 'ANALYTICS_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
            ClientProxyFactory.create({
                transport: Transport.TCP,
                options: {
                    host: process.env.ANALYTICS_SERVICE_HOST,
                    port: 4003,
                },
            }),
    }],
})

export class CategoryModule { }