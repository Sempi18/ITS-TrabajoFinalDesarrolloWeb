import { Module } from '@nestjs/common';
import { FacturaController } from './factura.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [FacturaController],
  imports: [
    ClientsModule.register([
    { 
      name: "FACTURA_MICROSERVICE",
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
      },
  ])],
})
export class FacturaModule {}
