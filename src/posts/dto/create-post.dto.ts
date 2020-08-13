import { IsArray, IsNotEmpty, IsString, isNotEmpty, IsUUID } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  readonly imageIds: string[];

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
