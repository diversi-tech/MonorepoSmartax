import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStepFieldDto, UpdateStepFieldDto } from "server/src/Models/dto/stepField.dto";
import { StepField } from "server/src/Models/stepField.model";


@Injectable()
export class StepFieldService {

  constructor(@InjectModel('StepField') private readonly StepFieldModel: Model<StepField>) { }

  async createStep(CreateStepFieldDto: CreateStepFieldDto): Promise<StepField> {
    const step = new this.StepFieldModel(
      CreateStepFieldDto
    );

    return step.save();
  }

  async updateStepFieldDto(id: string, updateStepFieldDto: UpdateStepFieldDto): Promise<StepField> {
    const step = await this.StepFieldModel.findByIdAndUpdate(
      id,
    ).exec();
    if (!step) {
      throw new NotFoundException('Yearly Report not found');
    }
    return step.save();
  }


  async deleteStepField(id: string): Promise<void> {
    const result = await this.StepFieldModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Step field not found');
    }
  }

  async getAllStepFields(): Promise<StepField[]> {
    return this.StepFieldModel.find().exec();
  }
}



