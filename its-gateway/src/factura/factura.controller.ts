import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('facturas')
export class FacturaController {
  constructor(
    @Inject('FACTURAS_SERVICE')
    private readonly facturasClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturasClient.send('createFactura', createFacturaDto).pipe(
      catchError((err) => {
        throw new BadRequestException(err);
      }),
    );
  }

  @Get()
  findAll() {
    return this.facturasClient.send('findAllFactura', {}).pipe(
      catchError((err) => {
        throw new BadRequestException(err);
      }),
    );
  }

  @Get('user/:id')
  findAllUser(@Param('id') id: string) {
    return this.facturasClient.send('findAllUserFactura', id).pipe(
      catchError((err) => {
        throw new BadRequestException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturasClient.send('findOneFactura', id).pipe(
      catchError((err) => {
        throw new BadRequestException(err);
      }),
    );
  }
}
