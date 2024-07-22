import { Body, Controller, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpErrorFilter } from "server/src/common/filters/http-error.filter";
import { CreateTaxRefundsDto, UpdateTaxRefundsDto } from "server/src/Models/dto/taxRefunds.dto";
import { TaxRefunds} from "server/src/Models/taxRefunds.model";
import { TaxRefundsService } from "server/src/services/taxRefunds.service";

@ApiTags('tax-refunds')
@Controller('tax-refunds')
@UseFilters(HttpErrorFilter)
export class TaxRefundsController{
    constructor(private readonly TaxRefundsService: TaxRefundsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new tax refunds' })
  @ApiBody({ type: CreateTaxRefundsDto })
  async create(@Body() createTaxRefundsDto: CreateTaxRefundsDto): Promise<TaxRefunds> {
    return this.TaxRefundsService.createTaxRefunds(createTaxRefundsDto);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a tax refunds by ID' })
  @ApiBody({ type: UpdateTaxRefundsDto })
  async update(@Param('id') id: string, @Body() updateTaxRefundsDto: UpdateTaxRefundsDto): Promise<TaxRefunds> {
    return this.TaxRefundsService.updateTaxRefunds(id, updateTaxRefundsDto);
  } 

  @Post('delete')
  @ApiOperation({ summary: 'Delete a tax refunds by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '667211d6c'
        }
      }
    }
  })
  async delete(@Body() body: { id: string }): Promise<void> {
    return this.TaxRefundsService.deleteTaxRefunds(body.id);
  }

  
  @Get('all')
  @ApiOperation({ summary: 'Get all tax refunds' })
  async getAllTaxRefunds(): Promise<TaxRefunds[]> {
    return this.TaxRefundsService.getAllTaxRefunds();
  }
}