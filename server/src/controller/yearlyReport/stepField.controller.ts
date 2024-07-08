import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpErrorFilter } from "server/src/common/filters/http-error.filter";
import { CreateStepFieldDto, UpdateStepFieldDto } from "server/src/Models/dto/fieldSchema.dto";
import { stepField, stepFieldModel} from "server/src/Models/fieldSchema.model";
import { StepFieldService } from "server/src/services/stepField.service";




@ApiTags('step-field')
@Controller('step-field')
@UseFilters(HttpErrorFilter)
export class StepFieldController{
    constructor(private readonly stepFieldService: StepFieldService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new step field' })
  @ApiBody({ type: CreateStepFieldDto })
  async create(@Body() createStepFieldDto: CreateStepFieldDto): Promise<stepField> {
    return this.stepFieldService.createStep(createStepFieldDto);
  }


  @Post('update')
  @ApiOperation({ summary: 'Update a step field by ID' })
  @ApiBody({ type: UpdateStepFieldDto })
  async update(@Body('id') id: string, @Body() updateStepFieldDto: UpdateStepFieldDto): Promise<stepField> {
    return this.stepFieldService.updateStepFieldDto(id, updateStepFieldDto);
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete a step field by ID' })
  async delete(@Body() body: { id: string }): Promise<void> {
    return this.stepFieldService.deleteStepField(body.id);
  }

  @Post('all')
  @ApiOperation({ summary: 'Get all step fields' })
  async getAllStepFields(): Promise<stepField[]> {
    return this.stepFieldService.getAllStepFields();
  }

}