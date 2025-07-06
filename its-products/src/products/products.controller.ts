import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('create_product')
  create(@Payload() data: CreateProductDto) {
    return this.productService.create(data);
  }
}
