import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || '1234567890',
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_CLIENT_HOST || 'localhost',
          port: parseInt(process.env.USER_CLIENT_PORT || '3001', 10),
        },
      },
      {
        name: 'FACTURAS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.FACTURA_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.FACTURA_SERVICE_PORT || '3003', 10),
        },
      },
    ]),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
