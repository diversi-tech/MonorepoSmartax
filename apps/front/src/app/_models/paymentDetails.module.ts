import { Frequency } from "./frequency.module";

export interface PaymentDetails {
    _id: string
    sumForMonth: number;
    maxHours: number;
    frequency: Frequency;
    dateStart: Date;
    dateFinish: Date;
    description?: string;
}