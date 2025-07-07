import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  nroFactura: string;
  @IsInt()
  usuarioId: number;
}
