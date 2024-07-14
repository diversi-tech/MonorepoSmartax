import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "server/src/common/filters/http-exception.filter";
import { CreateBillingDto } from "server/src/Models/dto/billing.dto";
import { CreatePaymentDto, UpdatePaymentDto } from "server/src/Models/dto/payment.dto";
import { CreatePaymentDetailsDto } from "server/src/Models/dto/paymentDetails.dto";
import { Payment } from "server/src/Models/payment.model";
import { PaymentService } from "server/src/services/payment.service";

@ApiTags('Payment')
@Controller('Payment')
@UseFilters(HttpExceptionFilter) 
export class PaymentController {

    constructor(private readonly PaymentService: PaymentService) { }

    @Post()
    async createPayment(@Body(new ValidationPipe()) createClientDto: CreatePaymentDto): Promise<Payment> {
        return await this.PaymentService.createPayment(createClientDto);
    }

    @Get()
    async getAllPayments(): Promise<Payment[]> {
        return await this.PaymentService.getAllFrequencies();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchPayment')
    async searchPayment(@Body(new ValidationPipe())  body:{"id":string}): Promise<Payment[]> {
        return await this.PaymentService.searchPayment(body.id);
    }
    @Put()
    async updatePayment(@Body(new ValidationPipe()) updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
        return await this.PaymentService.updatePayment(updatePaymentDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deletePayment(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.PaymentService.deletePayment(id.id);
    }

    @Post(':paymentId/billing')
    async addBillingToPayment(
        @Param('paymentId') paymentId: string,
        @Body(new ValidationPipe()) createBillingDto: CreateBillingDto
    ): Promise<Payment> {
        return await this.PaymentService.addBillingToPayment(paymentId, createBillingDto);
    }

    @Put(':paymentId/paymentDetails')
    async updatePaymentDetails(
        @Param('paymentId') paymentId: string,
        @Body(new ValidationPipe()) createPaymentDetailsDto: CreatePaymentDetailsDto
    ): Promise<Payment> {
        return await this.PaymentService.updatePaymentDetails(paymentId, createPaymentDetailsDto);
    }
}
