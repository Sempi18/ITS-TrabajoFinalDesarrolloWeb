import { Module } from '@nestjs/common';
import { FacturaController } from './factura.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [FacturaController],
  imports: [
    ClientsModule.register([
      {
        name: 'FACTURAS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3003,
        },
      },
    ]),
  ],
})
export class FacturaModule {}
