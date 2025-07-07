import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  nrofactura: string;

  @IsString()
  usuarioId: string;
}
