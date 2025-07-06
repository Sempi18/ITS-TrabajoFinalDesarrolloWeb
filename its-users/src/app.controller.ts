import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('login')
  login(@Payload() data: { username: string; password: string }) {
    return this.appService.login(data);
  }

  @MessagePattern('verify_token')
  verify(@Payload() token: string) {
    return this.appService.verifyToken(token);
  }

  @MessagePattern('validate_user')
  validate(@Payload() payload: { userId: number }) {
    return this.appService.validateUser(payload);
  }

  @MessagePattern('add_to_cart')
  addToCart(
    @Payload() data: { userId: number; productId: number; quantity: number },
  ) {
    return this.appService.addToCart(data);
  }
}
