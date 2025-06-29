import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FacturaController],
  providers: [FacturaService],
  imports: [PrismaModule],
})
export class FacturaModule {}
