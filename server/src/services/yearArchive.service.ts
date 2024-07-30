import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { YearArchive } from '../Models/yearArchive.model';
import { createYearArchiveDto } from '../Models/dto/yearArchive.dto';
import { Task } from '../Models/task.model';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class YearArchiveService {
  constructor(@InjectModel('YearArchive') private readonly YearArchiveModel: Model<YearArchive>
              ,@InjectModel('Task') private readonly taskModel: Model<Task>,
){}
  async createYearArchive(createYearArchiveDto:createYearArchiveDto): Promise<YearArchive> {
    const createYearArchive =new this.YearArchiveModel(createYearArchiveDto);
    return createYearArchive.save();
  }
  async deleteYearArchive(id: string){
    return this.YearArchiveModel.findByIdAndDelete(id);
  }
  async addTaskToYearArchive(yearNum: string, task: Task): Promise<YearArchive> {
    // Find the YearArchive for the given yearNum
    let yearArchive = await this.YearArchiveModel.findOne({ yearNum }).exec();
    if (!yearArchive) {
      // If YearArchive for the year does not exist, create a new one
      yearArchive = new this.YearArchiveModel({ yearNum, tasksData: [] });
    }
    // Add the task to the tasksData array
    yearArchive.tasksData.push(task);

    // Save the YearArchive document
    return await yearArchive.save();
  }
  
async addTasksToYearArchive(yearNum: string, tasks?: Task[]): Promise<YearArchive> {
  // Find the YearArchive for the given yearNum
  let yearArchive = await this.YearArchiveModel.findOne({ yearNum }).exec();
  if (!yearArchive) {
    // If YearArchive for the year does not exist, create a new one
    yearArchive = new this.YearArchiveModel({ yearNum, tasksData: [] });
  }
  yearArchive.tasksData.push(...tasks);

    // Save the YearArchive document
    return await yearArchive.save();
}
  async getAllYear(): Promise<YearArchive[]> {
    return this.YearArchiveModel.find().exec();
  }

  @Cron('0 0 1 1 *')
  async archiveOldTasks(): Promise<void> {
    console.log("hi");
    // Get the date one year ago
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() -1);

    // Find tasks older than one year
    const oldTasks = await this.taskModel.find({ dueDate: { $lt: oneYearAgo } }).exec();

    if (oldTasks.length > 0) { 
      // Move tasks to YearArchive
      await this.addTasksToYearArchive(oneYearAgo.setFullYear(oneYearAgo.getFullYear() -1).toString(), oldTasks);
      // Delete old tasks
      await this.taskModel.deleteMany({ _id: { $in: oldTasks.map(task => task._id) } }).exec();
    }
  }
}