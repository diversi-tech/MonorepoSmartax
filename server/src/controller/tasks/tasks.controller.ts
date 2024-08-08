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

@ApiTags('tasks')
@UseFilters(HttpErrorFilter)
// @UseFilters(ValidationException)
@Controller('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(
    private readonly taskService: TaskService,
    private jwtToken: TokenService,
    private hashService: hashPasswordService
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task[]> {
    try {
      const newTasks = await this.taskService.createTask(createTaskDto);
      return newTasks;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message!, error.status!
      );
    }
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskService.findAll();
      console.log(tasks);
      
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
    @Body(new ValidationPipe()) body: { id: string }): Promise<Task> {
    return await this.taskService.findOne(body.id);
  }

  @Post('by-client')
  @ApiOperation({ summary: 'Get communications by Client ID' })
  @ApiBody({
      schema: {
          type: 'object',
          properties: {
              clientId: {
                  type: 'string',
                  example: '123456789'
              }
          }
      }
  })
  async getTasksByClientId(@Body() body: { clientId: string }): Promise<Task[]> {
      return this.taskService.getTasksByClientId(body.clientId);
  }


  @Put('update/:id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiBody({ type: UpdateTaskDto })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    try {
      const updateTask = await this.taskService.updateTask(id, updateTaskDto);
      if (!updateTask) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
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
  async delete(@Body() body: { id: string }): Promise<Task> {
    return this.taskService.deleteTask(body.id);
  }
  // upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: Express.Multer.File): Promise<void> {
    const destinationPath = path.join(
      __dirname,
      '../../../uploads',
      image.originalname
    );
    console.log(destinationPath);

    // fs.writeFileSync(destinationPath, image.buffer);
    console.log(`התמונה נשמרה ב: ${destinationPath}`);
  }

  // @Get(':filename')
  // async getImage(@Param('filename') filename: string, @Res() res: Response) {
  //   const imagePath = path.join(__dirname, '../../../uploads', filename);
  //   if (fs.existsSync(imagePath)) {
  //     res.sendFile(imagePath);
  //   } else {
  //     res.status(404).send('Image not found');
  //   }
  // }
}
