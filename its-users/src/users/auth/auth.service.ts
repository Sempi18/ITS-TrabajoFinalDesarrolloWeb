import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  hashContrasenia(contrasenia: string): Promise<string> {
    const saltOrRounds = 12;
    return bcrypt.hash(contrasenia, saltOrRounds);
  }

  compararContrasenia(
    contrasenia: string,
    hashContrasenia: string,
  ): Promise<boolean> {
    return bcrypt.compare(contrasenia, hashContrasenia);
  }
}

