import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
  Get,
  Query,
  Param,
  Put,
  Delete,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from 'server/src/Models/dto/task.dto';
import { Task } from 'server/src/Models/task.model';
// import { ValidationException } from 'server/src/common/exceptions/validation.exception';
import { HttpErrorFilter } from 'server/src/common/filters/http-error.filter';
import { hashPasswordService } from 'server/src/services/hash-password';
import { TokenService } from 'server/src/services/jwt.service';
import { TaskService } from 'server/src/services/task.service';
//
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import {
  CreaterepeatableTaskDto,
  UpdaterepeatableTaskDto,
} from 'server/src/Models/dto/repeatableTask.dto';
import { repeatableTaskService } from 'server/src/services/repeatableTask.service';
import { RepeatableTask } from 'server/src/Models/repeatableTask.model';

@ApiTags('repeatableTask')
@UseFilters(HttpErrorFilter)
@Controller('repeatableTask')
@ApiBearerAuth()
export class RepeatableTaskController {
  constructor(
    private readonly taskRService: repeatableTaskService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  async create(
    @Body() createTaskDto: CreaterepeatableTaskDto
  ): Promise<RepeatableTask> {
    try {
      const newTask = await this.taskRService.create(createTaskDto);
      return newTask;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll(): Promise<RepeatableTask[]> {
    try {
      const tasks = await this.taskRService.findAll();
      return tasks;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch tasks',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @ApiBody({
    schema: { type: 'object', properties: { id: { type: 'string' } } },
  })
  @Post('findOne')
  async searchClient(
    @Body(new ValidationPipe()) body: { id: string }
  ): Promise<RepeatableTask> {
    return await this.taskRService.findOne(body.id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiBody({ type: UpdateTaskDto })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdaterepeatableTaskDto
  ): Promise<RepeatableTask> {
    try {
      const updateTask = await this.taskRService.update(id, updateTaskDto);
      if (!updateTask) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updateTask;
    } catch (error) {
      throw new HttpException(
        'Failed to update task',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { id: { type: 'string', example: '667211d6c' } },
    },
  })
  async delete(@Body() body: { id: string }): Promise<RepeatableTask> {
    return this.taskRService.delete(body.id);
  }
}
