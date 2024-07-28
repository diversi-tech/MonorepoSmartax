import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TaskArchive } from "../Models/taskArchive.model";
import { Injectable } from "@nestjs/common";
import { Task } from "../Models/task.model";

@Injectable()
export class TaskArchiveService{
    constructor(@InjectModel('TaskArchive') private readonly taskArchiveModel:Model<TaskArchive>){}
    async createTaskArchive(task:Task,isdeleted:boolean=false):Promise<TaskArchive>{
        const taskArchive=new this.taskArchiveModel({
            client:task.client,
            taskName:task.taskName,
            description:task.description,
            dueDate:task.dueDate,
            startDate:task.startDate,
            deletedDate:task.deadline,
            status:task.status,
            assignedTo:task.assignedTo,
            tags:task.tags,
            priority:task.priority,
            checkList:task.checkList,
            images:task.images,
            googleId:task.googleId,
            isDeleted:isdeleted

        });

        return taskArchive.save();
    }
//     storeDate: Date;

async getAllTask():Promise<TaskArchive[]> {
    return this.taskArchiveModel.find().exec();
} 

}  

