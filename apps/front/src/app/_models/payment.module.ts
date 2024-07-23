import { Billing } from "./billing.module";
import { PaymentDetails } from "./paymentDetails.module";
import { PaymentMethod } from "./paymentMethod.module";

export interface Payment{
    _id:string;
    mainPaymentDetails: PaymentDetails;
    morePaymentDetails: PaymentDetails[];
    totalPayment: number;
    paymentMethod: PaymentMethod;
    paymentHistory: PaymentDetails[];
    billingHistory: Billing[];
  }