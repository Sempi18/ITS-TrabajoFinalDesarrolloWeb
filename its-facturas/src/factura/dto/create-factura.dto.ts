import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  nroFactura: string;
  @IsString()
  usuarioId: string;
}
