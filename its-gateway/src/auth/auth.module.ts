
// ... imports
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // ... otros modulos
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController, ProductosController, FacturasController, UsuariosController],
  providers: [
    AppService,
    JwtStrategy, // Añadir la estrategia
    {
      provide: 'USUARIOS_SERVICE',
      // ... tu configuración de ClientProxy
    },
    // ... otros providers
  ],
})
export class AppModule {}