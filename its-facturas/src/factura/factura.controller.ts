import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';

@Controller()
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @MessagePattern('createFactura')
  create(@Payload() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto).catch((error) => {
      throw new RpcException({ message: error, status: 400 });
    });
  }

  @MessagePattern('findAllFactura')
  async findAll() {
    try {
      return await this.facturaService.findAll();
    } catch (error) {
      console.error('Error en findAllFactura:', error);
      throw new RpcException({ message: error.message || error, status: 500 });
    }
  }

  @MessagePattern('findAllUserFactura')
  findAllUser(@Payload() usuarioId: string) {
    return this.facturaService.findAllUser(usuarioId);
  }

  @MessagePattern('findOneFactura')
  findOne(@Payload() id: string) {
    return this.facturaService.findOne(id);
  }
}
