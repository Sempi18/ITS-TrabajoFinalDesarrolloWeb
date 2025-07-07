import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_CLIENT_HOST || 'localhost',
          port: parseInt(process.env.USER_CLIENT_PORT || '3001', 10),
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
