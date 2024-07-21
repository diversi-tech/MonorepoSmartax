import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsDate,
} from 'class-validator';
import { Frequency } from '../frequency.model';
import { Priority } from '../priority.model';
import { Tag } from '../tag.model';
import { User } from '../user.model';
import { Client } from '../client.model';

export class CreaterepeatableTaskDto {
  @IsNotEmpty()
  client: Client;

  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  assignedTo: User[];

  @IsNotEmpty()
  tags: Tag[];

  @IsNotEmpty()
  priority: Priority;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  virtual: boolean;

  @IsNotEmpty()
  frequency: Frequency;

  @IsNotEmpty()
  docs: string[];
}
export class UpdaterepeatableTaskDto {
  @ApiProperty({ description: 'The repeatableTask ID' })
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  client?: Client;

  @IsOptional()
  @IsString()
  taskName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  dueDate?: Date;

  @IsOptional()
  @IsString() //{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  assignedTo?: User[];

  @IsOptional()
  @IsString() //{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
  tags?: Tag[];

  @IsOptional()
  @IsString()
  priority?: Priority;

  @IsOptional()
  @IsString()
  active?: boolean;

  @IsOptional()
  @IsString()
  virtual?: boolean;

  @IsOptional()
  @IsString()
  frequency?: Frequency;

  @IsOptional()
  @IsString()
  docs?: string[];
}
