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
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto'; // Ajusta si cambia el nombre o ruta

@Controller('product')
export class ProductController {
  constructor(
    @Inject('PRODUCT_MICROSERVICE')
    private readonly productClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send('createProduct', createProductDto).pipe(
      catchError((err) => {
        throw new BadRequestException(err);
      }),
    );
  }

  @Get()
  findAll() {
    return this.productClient.send('findAllProduct', {}).pipe(
      catchError((err) => {
        throw new BadRequestException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send('findOneProduct', id).pipe(
      catchError((err) => {
        throw new BadRequestException(err);
      }),
    );
  }

  // Ejemplo: Buscar productos por categoría
  @Get('category/:categoryName')
  findByCategory(@Param('categoryName') categoryName: string) {
    return this.productClient.send('findByCategoryProduct', categoryName).pipe(
      catchError((err) => {
        throw new BadRequestException(err);
      }),
    );
  }
}
