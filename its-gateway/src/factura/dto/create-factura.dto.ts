import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  nroFactura: string;

  @IsNumber()
  usuarioId: number;
}
