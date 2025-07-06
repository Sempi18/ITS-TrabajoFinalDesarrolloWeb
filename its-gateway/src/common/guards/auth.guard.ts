import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token no enviado');

    const token = authHeader.split(' ')[1];
    try {
      const user = await firstValueFrom(
        this.usersClient.send('verify_token', token),
      );
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
