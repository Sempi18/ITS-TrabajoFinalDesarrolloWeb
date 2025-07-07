import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProductController],
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
})
export class ProductModule {}
