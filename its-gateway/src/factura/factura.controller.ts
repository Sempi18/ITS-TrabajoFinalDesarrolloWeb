import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('factura')
export class FacturaController {
  constructor(
    @Inject('FACTURAS_SERVICE')
    private readonly facturasClient: ClientProxy,
  ) {}
  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturasClient
      .send(
        'createFactura', // NOMBRE DEL EVENTO EN EL MICROSERVICE);
        createFacturaDto, //El payload;
      )
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      );
  }

  @Get()
  findAll() {
    return this.facturasClient
      .send(
        'findAllFactura', // NOMBRE DEL EVENTO EN EL MICROSERVICE);
        {}, //El payload;
      )
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      );
  }
  @Get('user/:id')
  findAllUser(@Param('id', ParseIntPipe) id: number) {
    return this.facturasClient
      .send(
        'findAllUserFactura', // NOMBRE DEL EVENTO EN EL MICROSERVICE);
        id, //El payload;
      )
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facturasClient
      .send(
        'findOneFactura', // NOMBRE DEL EVENTO EN EL MICROSERVICE);
        {}, //El payload;
      )
      .pipe(
        catchError((err) => {
          throw new BadRequestException(err);
        }),
      );
  }
}
