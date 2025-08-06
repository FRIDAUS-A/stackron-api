import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
;

export class CreateCartDto {
	@IsArray()
  	@IsUUID('all', { each: true })
  	@IsNotEmpty()
  	productIds: string[];

}