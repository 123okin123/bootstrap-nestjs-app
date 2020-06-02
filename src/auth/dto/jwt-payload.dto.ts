import { IsNotEmpty } from 'class-validator';

export class JwtPayloadDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly userId: string;
}