import { Body, Controller, Delete, Get, Post, Put, UseFilters, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "server/src/common/filters/http-exception.filter";
import { CreateTimerDto, UpdateTimerDto } from "server/src/Models/dto/timer.dto";
import { Timer } from "server/src/Models/timer.model";
import { TimerService } from "server/src/services/timer.service";

@ApiTags('Timer')
@Controller('timer')
@UseFilters(HttpExceptionFilter) 
@ApiBearerAuth()
export class TimerController {

    constructor(private readonly timerService: TimerService) { }

    @Put()
    @ApiOperation({ summary: 'Add Timer' })
    async createTimer(@Body(new ValidationPipe()) createTimerDto: CreateTimerDto): Promise<Timer> {
        return await this.timerService.createTimer(createTimerDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all timer' })
    async getAllTimer(): Promise<Timer[]> {
        return await this.timerService.getALLTimer();
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Post('searchMeet')
    @ApiOperation({ summary: 'Find timer by id' })
    async searchTimer(@Body(new ValidationPipe())  body:{"id":string}): Promise<Timer> {
        return await this.timerService.searchTimer(body.id);
    }
    @Post()
    @ApiOperation({ summary: 'Update timer' })
    async updateTimer(@Body(new ValidationPipe()) UpdateTimerDto: UpdateTimerDto): Promise<Timer> {
        return await this.timerService.updateTimer(UpdateTimerDto);
    }
    @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' } } } })
    @Delete()
    @ApiOperation({ summary: 'Delete timer by id' })
    async deleteTimer(@Body(new ValidationPipe()) id:{"id":string}): Promise<boolean> {
        return await this.timerService.deleteTimer(id.id);
    }
}