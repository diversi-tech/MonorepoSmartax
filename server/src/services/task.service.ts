import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User, UserModel } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../Models/dto/user.dto';
import { ValidationException } from '../common/exceptions/validation.exception';
import { TokenService } from './jwt.service';
import * as bcrypt from 'bcryptjs';
import { Task } from '../Models/task.model';
import { CreateTaskDto, UpdateTaskDto } from '../Models/dto/task.dto';
import { TasksGateway } from './socket/socket.gateway';
import { ClientService } from './client.service';


@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private jwtToken: TokenService,
    private clientService: ClientService,
    private readonly tasksGateway: TasksGateway
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task[]> {
    const { client, taskName, description, dueDate, status, assignedTo, tags, deadline, priority, images, googleId, startDate } = createTaskDto;
    const tasks: Task[] = [];
    if (client.length){
      for (const singleClient of client) {
        const createTask = new this.taskModel({ 
          client: singleClient, 
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
        });
        const savedTask = await createTask.save();
        tasks.push(savedTask);
      }
    }else
    {
      const createTask = new this.taskModel({ client, taskName, description, dueDate, status, assignedTo, tags, deadline, priority, images, googleId, startDate})
      const savedTask = await createTask.save();
      tasks.push(savedTask);
    }
  
    return tasks;
  }
  
  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById({ _id: id }).exec();
    if (!task) {
      throw new ValidationException('Task not found');
    }
    return task;
  }

  async getTasksByClientId(clientId: string): Promise<Task[]> {
    console.log('Searching for tasks with client ID:', clientId);
    const tasks = await this.taskModel.find({ client: clientId }).exec();
    console.log('tasks found:', tasks);
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
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new ValidationException('User not found');
    }
    return deletedTask;
  }
}
