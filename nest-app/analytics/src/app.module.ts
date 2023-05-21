import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AnalyticsData, AnalyticsSchema } from './schemas/analytics.schema';

@Module({

  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://root:example@localhost/challengev2', {
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: AnalyticsData.name, schema: AnalyticsSchema }]),

  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }