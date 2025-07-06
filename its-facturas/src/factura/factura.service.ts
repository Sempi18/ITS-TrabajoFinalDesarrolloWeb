import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FacturaService {
  constructor(private readonly prisma: PrismaService) {}
  create(createFacturaDto: CreateFacturaDto) {
    return this.prisma.facturas.create({ data: createFacturaDto });
  }

  findAll() {
    return this.prisma.facturas.findMany();
  }
  findAllUser(usuarioId: number) {
    return this.prisma.facturas.findMany({ where: { usuarioId } });
  }
  findOne(id: string) {
    return this.prisma.facturas.findFirst({ where: { id } });
  }
}
