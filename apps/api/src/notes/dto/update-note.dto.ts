import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNoteDto {
  @ApiPropertyOptional({
    description: 'The title of the note',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({
    description: 'The content of the note',
  })
  @IsString()
  @IsOptional()
  content?: string;
}
