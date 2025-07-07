import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async login({ username, password }: { username: string; password: string }) {
    const user = await this.prisma.usuarios_table.findFirst({
      where: { email: username, password },
    });
    if (!user) throw new UnauthorizedException();
    const token = jwt.sign({ userId: user.id, role: user.rol }, 'JWT_SECRET', {
      expiresIn: '1h',
    });
    return { token };
  }

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, 'JWT_SECRET');
    } catch {
      throw new UnauthorizedException();
    }
  }

  async validateUser(payload: { userId: number }) {
    return this.prisma.usuarios_table.findUnique({
      where: { id: payload.userId },
    });
  }

  async addToCart(data: {
    userId: number;
    productId: number;
    quantity: number;
  }) {
    return this.prisma.cart.create({ data });
  }
}
