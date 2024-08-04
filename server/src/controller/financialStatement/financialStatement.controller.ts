import { Body, Controller, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpErrorFilter } from "server/src/common/filters/http-error.filter";
import { CreateFinancialStatementDto, UpdateFinancialStatementDto } from "server/src/Models/dto/financialStatement.dto";
import { FinancialStatement, FinancialStatementModel } from "server/src/Models/financialStatement.model";
import { FinancialStatementService } from "server/src/services/financialStatement.service";

@ApiTags('financial-statements')
@Controller('financial-statements')
@UseFilters(HttpErrorFilter)
export class FinancialStatementController {
    constructor(private readonly financialStatementService: FinancialStatementService) {}

    @Post('create')
    @ApiOperation({ summary: 'Create a new financial statement' })
    @ApiBody({ type: CreateFinancialStatementDto })
    async create(@Body() createFinancialStatementDto: CreateFinancialStatementDto): Promise<FinancialStatement> {
        return this.financialStatementService.createFinancialStatement(createFinancialStatementDto);
    }

    @Post('update/:id')
    @ApiOperation({ summary: 'Update a financial statement by ID' })
    @ApiBody({ type: UpdateFinancialStatementDto })
    async update(@Param('id') id: string, @Body() updateFinancialStatementDto: UpdateFinancialStatementDto): Promise<FinancialStatement> {
        return this.financialStatementService.updateFinancialStatement(id, updateFinancialStatementDto);
    }

    @Post('delete')
    @ApiOperation({ summary: 'Delete a financial statement by ID' })
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
        return this.financialStatementService.deleteFinancialStatement(body.id);
    }

    @Get('all')
    @ApiOperation({ summary: 'Get all financial statements' })
    async getAllFinancialStatements(): Promise<FinancialStatement[]> {
        return this.financialStatementService.getAllFinancialStatements();
    }
}