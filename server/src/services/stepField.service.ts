import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {  CreateStepFieldDto, UpdateStepFieldDto } from "server/src/Models/dto/fieldSchema.dto";
import {  stepField ,stepFieldModel} from "server/src/Models/fieldSchema.model";


@Injectable()
export class StepFieldService{
    constructor(@InjectModel('StepField' ) private readonly  stepFieldModel: Model<stepField>){}

    async createStep(CreateStepFieldDto: CreateStepFieldDto): Promise<stepField> {
        const step = new this.stepFieldModel(
          CreateStepFieldDto
        );
    
        return step.save();
      }
      async updateStepFieldDto(id: string, UpdateStepFieldDto: UpdateStepFieldDto): Promise<stepField> {
        const step=await this.stepFieldModel.findByIdAndUpdate(
            id,
            this.updateStepFieldDto,
            {new: true}
        ).exec();

        if(!step){
            throw new NotFoundException('step not found');
        }

   
        return step;
      }

      async deleteStepField(id: string): Promise<void> {
        const result = await this.stepFieldModel.findByIdAndDelete(id).exec();
        if (!result) {
          throw new NotFoundException('Step field not found');
        }
      }
    
      async getAllStepFields(): Promise<stepField[]> {
        return this.stepFieldModel.find().exec();
      }

}



 