import { PaymentDetails } from '../paymentDetails.model';
import { PaymentMethod } from '../paymentMethod.model';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @ValidateNested()
  @Type(() => PaymentDetails)
  paymentDetails: PaymentDetails;

  @IsNotEmpty()
  @IsNumber()
  totalPayment: number;

  @ValidateNested()
  @Type(() => PaymentMethod)
  paymentMethod: PaymentMethod;
}

export class UpdatePaymentDto {
  @ValidateNested()
  @Type(() => PaymentDetails)
  paymentDetails?: PaymentDetails;

  @IsNumber()
  totalPayment?: number;

  @ValidateNested()
  @Type(() => PaymentMethod)
  paymentMethod?: PaymentMethod;
}
