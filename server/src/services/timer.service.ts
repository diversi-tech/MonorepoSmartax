import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Timer } from "../Models/timer.model";
import { Model, Types } from "mongoose";
import { CreateTimerDto, UpdateTimerDto } from "../Models/dto/timer.dto";
import { ValidationException } from "../common/exceptions/validation.exception";
import { User } from "../Models/user.model";
import { Task } from "../Models/task.model";

@Injectable()
export class TimerService {

    constructor(@InjectModel('Timer') private readonly TimerModel: Model<Timer>,
        @InjectModel('User') private readonly UserModel: Model<User>,
        @InjectModel('Task') private readonly TaskModel: Model<Task>
    ) { }

    async createTimer(createTimerDto: CreateTimerDto): Promise<Timer> {
        const { taskId, userId, hours, minutes, seconds } = createTimerDto;
        await this.validateReferences(createTimerDto.userId, createTimerDto.taskId);

        if (!taskId || !userId) {
            throw new ValidationException('Missing required fields');
        }
        const createTimer = new this.TimerModel({
            taskId,
            userId,
            hours,
            minutes,
            seconds
        });
        try {
            return await createTimer.save();

        } catch (error) {
            console.log("error in save:\n" + error);
            return
        }
    }

    async getALLTimer(): Promise<Timer[]> {
        return await this.TimerModel.find().exec();
    }
    async updateTimer(updateTimerDto: UpdateTimerDto): Promise<Timer> {
        const { id, ...updateData } = updateTimerDto;
        await this.validateReferences(updateTimerDto.userId, updateTimerDto.taskId);
        const updatedTimer = await this.TimerModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTimer) {
            throw new NotFoundException(`Timer with ID ${id} not found`);
        }
        return updatedTimer;
    }

    async deleteTimer(id: string): Promise<boolean> {
        const deletedTimer = await this.TimerModel.findByIdAndDelete(id);
        if (!deletedTimer) {
            throw new NotFoundException(`Timer with ID ${id} not found`);
        }
        return !!deletedTimer;
    }
    async searchTimer(id: string): Promise<Timer> {
        const Timer = await this.TimerModel.find({ "_id": id }).exec();
        if (!Timer || Timer.length === 0) {
            throw new NotFoundException('Timer not found');
        }
        return Timer[0];
    }

    private async validateReferences(userId: string, taskId: string): Promise<void> {
        const user = await this.UserModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const task = await this.TaskModel.findById(taskId).exec();
        if (!task) {
            throw new NotFoundException(`Task with ID ${taskId} not found`);
        }
    }
}
