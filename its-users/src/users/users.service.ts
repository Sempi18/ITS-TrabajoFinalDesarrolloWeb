import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.usuarios_table.create({ data });
  }

  findAll() {
    return this.prisma.usuarios_table.findMany();
  }

  findByEmail(email: string) {
    return this.prisma.usuarios_table.findUnique({ where: { email } });
  }

  getHello() {
    return 'Hola desde MS its-users!';
  }
  findById(id: number | string) {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;
    return this.prisma.usuarios_table.findUnique({ where: { id: userId } });
  }
  
}
