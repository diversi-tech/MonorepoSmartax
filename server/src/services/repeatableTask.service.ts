import { RepeatableTask } from './../Models/repeatableTask.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidationException } from '../common/exceptions/validation.exception';
import {
  CreaterepeatableTaskDto,
  UpdaterepeatableTaskDto,
} from '../Models/dto/repeatableTask.dto';

@Injectable()
export class repeatableTaskService {
  constructor(
    @InjectModel('RepeatableTask')
    private readonly repeatableTask: Model<RepeatableTask>
  ) {}

  async create(
    createTaskDto: CreaterepeatableTaskDto
  ): Promise<RepeatableTask> {
    const {
      client,
      taskName,
      description,
      dueDate,
      assignedTo,
      tags,
      priority,
      docs,
      frequency,
      active,
      virtual,
    } = createTaskDto;
    // const task = new this.taskModel(createTaskDto);
    // return task.save()
    // if (!client || !assignedTo) {
    //   throw new ValidationException('Missing required fields');
    // }

    const createTask = new this.repeatableTask({
      client,
      taskName,
      description,
      dueDate,
      assignedTo,
      tags,
      priority,
      docs,
      frequency,
      active,
      virtual,
    });
    return await createTask.save();
  }

  async findAll(): Promise<RepeatableTask[]> {
    return await this.repeatableTask.find().exec();
  }

  async findOne(id: string): Promise<RepeatableTask> {
    const task = await this.repeatableTask.findById({ _id: id }).exec();
    if (!task) {
      throw new ValidationException('Task not found');
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdaterepeatableTaskDto
  ): Promise<RepeatableTask> {
    const {
      client,
      taskName,
      description,
      dueDate,
      assignedTo,
      tags,
      priority,
      docs,
      frequency,
      active,
      virtual,
    } = updateTaskDto;

    const updatedTask = await this.repeatableTask
      .findByIdAndUpdate(
        id,
        {
          client,
          taskName,
          description,
          dueDate,
          assignedTo,
          tags,
          priority,
          docs,
          frequency,
          active,
          virtual,
        },
        { new: true }
      )
      .exec();

    if (!updatedTask) {
      throw new ValidationException('repeatableTask not found');
    }
    return updatedTask;
  }

  async delete(id: string): Promise<RepeatableTask> {
    const deletedTask = await this.repeatableTask.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new ValidationException('repeatableTask not found');
    }
    return deletedTask;
  }
}
