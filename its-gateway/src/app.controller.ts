import { Controller, Get, HttpException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}

  @Get()
  getHello() {
    return this.userClient.send('getHello', {}).pipe(
      catchError((err) => {
        const message = err?.message || 'Error en microservicio USER';
        const status = err?.statusCode || 500;
        return throwError(() => new HttpException(message, status));
      }),
    );
  }
}
