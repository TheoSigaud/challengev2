import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({

  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [{

    provide: 'AUTH_SERVICE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 4000,

        },

      }),

  }],

})

export class AuthModule {}