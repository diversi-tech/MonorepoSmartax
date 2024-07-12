import { Body, Controller, Delete, Get, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "server/src/common/filters/http-exception.filter";
import { CreatePaymentDetailsDto, UpdatePaymentDetailsDto } from "server/src/Models/dto/paymentDetails.dto";
import { PaymentDetails } from "server/src/Models/paymentDetails.model";
import { PaymentDetailsService } from "server/src/services/paymentDetails.service";

@ApiTags('PaymentDetails')
@Controller('PaymentDetails')
@UseFilters(HttpExceptionFilter) 
export class PaymentDetailsController {

    constructor(private readonly paymentDetailsService: PaymentDetailsService) { }

    @Post()
    async createPaymentDetails(@Body(new ValidationPipe()) createPaymentDetailsDto: CreatePaymentDetailsDto): Promise<PaymentDetails> {
        return await this.paymentDetailsService.createPaymentDetails(createPaymentDetailsDto);
    }

    @Get()
    async getAllPaymentDetailss(): Promise<PaymentDetails[]> {
        return await this.paymentDetailsService.getAllFrequencies();
    }

    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchPaymentDetails')
    async searchPaymentDetails(@Body(new ValidationPipe()) body: { id: string }): Promise<PaymentDetails[]> {
        return await this.paymentDetailsService.searchPaymentDetails(body.id);
    }

    @Put()
    async updatePaymentDetails(@Body(new ValidationPipe()) updatePaymentDetailsDto: UpdatePaymentDetailsDto): Promise<PaymentDetails> {
        return await this.paymentDetailsService.updatePaymentDetails(updatePaymentDetailsDto);
    }

    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deletePaymentDetails(@Body(new ValidationPipe()) id: { id: string }): Promise<boolean> {
        return await this.paymentDetailsService.deletePaymentDetails(id.id);
    }
}
