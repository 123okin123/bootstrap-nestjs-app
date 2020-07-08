import { IsNotEmpty } from 'class-validator';

export class JwtPayloadDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly userId: string;
}
