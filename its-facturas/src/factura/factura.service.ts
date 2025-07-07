import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FacturaService {
  constructor(private readonly prisma: PrismaService) {}
  create(createFacturaDto: CreateFacturaDto) {
    return this.prisma.facturas.create({ data: createFacturaDto });
  }

  async findAll() {
    try {
      const facturas = await this.prisma.facturas.findMany();
      console.log('Facturas obtenidas:', facturas);
      return facturas;
    } catch (error) {
      console.error('Error en factura.service.findAll:', error);
      throw error; // relanzar para que lo capture el controller
    }
  }

  findAllUser(usuarioId: string) {
    return this.prisma.facturas.findMany({ where: { usuarioId } });
  }
  findOne(id: string) {
    return this.prisma.facturas.findFirst({ where: { id } });
  }
}
