import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CategoryModule,
    MongooseModule.forRoot('mongodb://root:example@localhost/challengev2', {
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  ],
  controllers: [],
  providers: []

})

export class AppModule { }