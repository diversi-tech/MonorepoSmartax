import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidationException } from '../common/exceptions/validation.exception';
import { TokenService } from './jwt.service';
import { Task } from '../Models/task.model';
import { CreateTaskDto, UpdateTaskDto } from '../Models/dto/task.dto';
import { TasksGateway } from './socket/socket.gateway';
import { YearArchiveService } from './yearArchive.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private yearArchiveService: YearArchiveService
  ) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {
      client,
      taskName,
      description,
      dueDate,
      status,
      assignedTo,
      tags,
      deadline,
      priority,
      images,
      googleId,
      startDate,
      parent,
      subTasks
    } = createTaskDto;

    const createTask = new this.taskModel({
      client,
      taskName,
      description,
      dueDate,
      status,
      assignedTo,
      tags,
      priority,
      images,
      googleId,
      deadline,
      startDate,
      parent,
      subTasks
    });
    return await createTask.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById({ _id: id }).exec();
      if (!task) {
        throw new ValidationException('Task not found');
      }
      return task;
    } catch (err) {
      console.log(err);
    }
  }

  async getTasksByClientId(clientId: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ client: clientId }).exec();
    return tasks;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const {
        client,
        taskName,
        description,
        dueDate,
        status,
        assignedTo,
        tags,
        checkList,
        priority,
        images,
        googleId,
        deadline,
        startDate,
        parent,
        subTasks
      } = updateTaskDto;

      const updatedTask = await this.taskModel
        .findByIdAndUpdate(
          id,
          {
            client,
            taskName,
            description,
            dueDate,
            status,
            assignedTo,
            tags,
            checkList,
            priority,
            images,
            googleId,
            deadline,
            startDate,
            parent,
            subTasks
          },
          { new: true }
        )
        .exec();

      if (!updatedTask) {
        throw new ValidationException('Task not found');
      }
      return updatedTask;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new ValidationException('task not found');
    }
    const yearNum = new Date().getFullYear().toString();
    // Example logic to get year number
    await this.yearArchiveService.addTaskToYearArchive(yearNum, task)
    await this.taskModel.findByIdAndDelete(id).exec();
    return deletedTask;
  }
}



