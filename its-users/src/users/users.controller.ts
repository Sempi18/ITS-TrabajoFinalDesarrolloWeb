import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  create(@Payload() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.userService.findAll();
  }
  @MessagePattern('findUserByEmail')
  findByEmail(@Payload() email: string) {
    return this.userService.findByEmail(email);
  }
  @MessagePattern('findUserById')
  findById(@Payload() id: number | string) {
    return this.userService.findById(id);
  }

  @MessagePattern('getHello')
  getHello() {
    return this.userService.getHello();
  }
}
