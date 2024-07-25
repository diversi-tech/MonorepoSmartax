import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {  CreateStepFieldMonthDto, UpdateStepFieldMonthDto } from "server/src/Models/dto/stepFieldMonth.dto";
import {  StepFieldMonth ,stepFieldMonthModel} from "server/src/Models/stepFieldMonth.model";


@Injectable()
export class StepFieldMonthService{
    constructor(@InjectModel('StepFieldMonth') private readonly  StepFieldMonthModel:Model<StepFieldMonth> ){}

    async createStep(CreateStepFieldMonthDto: CreateStepFieldMonthDto): Promise<StepFieldMonth> {
        const step = new this.StepFieldMonthModel(
          CreateStepFieldMonthDto
        );
    
        return step.save();
      }

      async updateStepFieldMonthDto(id: string, updateStepFieldMonthDto: UpdateStepFieldMonthDto): Promise<StepFieldMonth> {
        const step = await this.StepFieldMonthModel.findByIdAndUpdate(
          id,
          updateStepFieldMonthDto,
          // { new: true }
        ).exec();
    
        if (!step) {
          throw new NotFoundException('step field month not found');
        }
    
        return step.save();
      }
  

      async deleteStepFieldMonth(id: string): Promise<void> {
        const result = await this.StepFieldMonthModel.findByIdAndDelete(id).exec();
        if (!result) {
          throw new NotFoundException('Step field not found');
        }
      }
    
      async getAllStepFieldsMonth(): Promise<StepFieldMonth[]> {
        return this.StepFieldMonthModel.find().exec();
      }

}



 