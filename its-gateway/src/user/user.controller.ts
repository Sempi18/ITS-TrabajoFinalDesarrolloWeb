import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
import { throwError } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() newUser: CreateUserDto) {
    return this.userClient.send('createUser', newUser).pipe(
      catchError((error) => {
        const statusCode = error?.statusCode || 500;
        const message = error?.message || 'Error al crear usuario';
        return throwError(() => new HttpException(message, statusCode));
      }),
    );
  }
}
