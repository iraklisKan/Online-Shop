import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class CreateSessionRequest {
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  productIds!: number[];
}
