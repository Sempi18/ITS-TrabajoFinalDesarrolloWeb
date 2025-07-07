import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { envs } from './config/envs';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { FacturaModule } from './factura/factura.module';

import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    ProductModule,
    FacturaModule,
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: envs.USER_CLIENT_HOST || 'localhost',
          port: envs.USER_CLIENT_PORT || 3001,
        },
      },
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
      {
        name: 'FACTURAS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 },
      },
    ]),
    JwtModule.register({
      secret: envs.JWT_SECRET || '1234567890',
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
