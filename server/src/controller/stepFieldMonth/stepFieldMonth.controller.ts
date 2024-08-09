import { Body, Controller, Get, Param, Post, UseFilters } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpErrorFilter } from "server/src/common/filters/http-error.filter";
import { CreateStepFieldMonthDto, UpdateStepFieldMonthDto } from "server/src/Models/dto/stepFieldMonth.dto";
import { StepFieldMonth, stepFieldMonthModel} from "server/src/Models/stepFieldMonth.model";
import { StepFieldMonthService } from "server/src/services/stepFieldMonth.service";




@ApiTags('step-field-month')
@Controller('step-field-month')
@UseFilters(HttpErrorFilter)
@ApiBearerAuth()
export class StepFieldMonthController{
    constructor(private readonly stepFieldMonthService: StepFieldMonthService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new step field month' })
  @ApiBody({ type: CreateStepFieldMonthDto })
  async create(@Body() createStepFieldMonthDto: CreateStepFieldMonthDto): Promise<StepFieldMonth> {
    return this.stepFieldMonthService.createStep(createStepFieldMonthDto);
  }

   
  @Post('update/:id')
  @ApiOperation({ summary: 'Update a step field month by ID' })
  @ApiBody({ type: UpdateStepFieldMonthDto })
  async update(@Param('id') id: string, @Body() updateStepFieldMonthDto: UpdateStepFieldMonthDto): Promise<StepFieldMonth> {
    return this.stepFieldMonthService.updateStepFieldMonthDto(id, updateStepFieldMonthDto);
  }

 

  // @Post('delete')
  // @ApiOperation({ summary: 'Delete a step field by ID' })
  // async delete(@Body('id') body: { id: string }): Promise<void> {
  //   return this.stepFieldService.deleteStepField(body.id);
  // }
  @Post('delete')
  @ApiOperation({ summary: 'Delete a step field month by ID' })
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
    return this.stepFieldMonthService.deleteStepFieldMonth(body.id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all step fields month' })
  async getAllStepFieldsMonth(): Promise<StepFieldMonth[]> {
    return this.stepFieldMonthService.getAllStepFieldsMonth();
  }
  @Get('types')
  @ApiOperation({ summary: 'Get all step fields month' })
  async getAllTypes(): Promise<string[]> {
    return this.stepFieldMonthService.getAllTypes();
  }
  @Get('values/:type')
  @ApiOperation({ summary: 'Get all step fields month' })
  async getAllValues(@Param('type') type:string): Promise<string[]> {
    return this.stepFieldMonthService.getAllValuesForType(type);
  }
}