import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';
import { FacturaModule } from './factura/factura.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

JwtModule.register({ secret: config.get('JWT_SECRET'), signOptions: { expiresIn: '60m' } }),
PassportModule.register({ defaultStrategy: 'jwt' }),

@Module({
  controllers: [AppController],
  imports: [
    ClientsModule.register([
      {
        name: 'MS_USER',
        transport: Transport.TCP,
        options: {
          host: envs.MS_USER_HOST,
          port: envs.MS_USER_PORT,
        },
      },
    ]),
    FacturaModule,
  ],
})
export class AppModule {}
