import { Body, Controller, Delete, Get, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "server/src/common/filters/http-exception.filter";
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from "server/src/Models/dto/paymentMethod.dto";
import { PaymentMethod } from "server/src/Models/paymentMethod.model";
import { PaymentMethodService } from "server/src/services/PaymentMethod.service";

@ApiTags('PaymentMethod')
@Controller('PaymentMethod')
@UseFilters(HttpExceptionFilter) 
@ApiBearerAuth()
export class PaymentMethodController {

    constructor(private readonly PaymentMethodService: PaymentMethodService) { }

    @Post()
    async createPaymentMethod(@Body(new ValidationPipe()) createClientDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        return await this.PaymentMethodService.createPaymentMethod(createClientDto);
    }

    @Get()
    async getAllPaymentMethods(): Promise<PaymentMethod[]> {
        return await this.PaymentMethodService.getAllFrequencies();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchPaymentMethod')
    async searchPaymentMethod(@Body(new ValidationPipe())  body:{"id":string}): Promise<PaymentMethod[]> {
        return await this.PaymentMethodService.searchPaymentMethod(body.id);
    }
    @Put()
    async updatePaymentMethod(@Body(new ValidationPipe()) updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
        return await this.PaymentMethodService.updatePaymentMethod(updatePaymentMethodDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    async deletePaymentMethod(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.PaymentMethodService.deletePaymentMethod(id.id);
    }
}
