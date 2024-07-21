import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Frequency } from "../Models/frequency.model";
import { CreatefrequencyDto, UpdatefrequencyDto } from "../Models/dto/frequency.dto";
import { ValidationException } from "../common/exceptions/validation.exception";

@Injectable()
export class FrequencyService {

    constructor(@InjectModel('Frequency') private readonly FrequencyModel: Model<Frequency>) {}

    async createFrequency(createFrequencyDto: CreatefrequencyDto): Promise<Frequency> {
        const { color,name } = createFrequencyDto;

        if (!color || !name ) {
          throw new ValidationException('Missing required fields');
        }
        const createdFrequency = new this.FrequencyModel({ color,name });
        return await createdFrequency.save();
    }

    async getAllFrequencies(): Promise<Frequency[]> {
        return await this.FrequencyModel.find().exec();
    }
    async searchFrequency(id:string): Promise<Frequency[]> {
        const frequency= await this.FrequencyModel.find({"_id":id}).exec();
        if (!frequency || frequency.length === 0) {
            throw new NotFoundException('frequency not found');
          }
          return frequency;
    }
    async updateFrequency(updateFrequencyDto: UpdatefrequencyDto): Promise<Frequency> {
        const {id, ...updateData } = updateFrequencyDto;
        const updatedFrequency = await this.FrequencyModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedFrequency) {
            throw new NotFoundException(`frequency with ID ${id} not found`);
        }
        return updatedFrequency;
    }

    async deleteFrequency(id: string): Promise<boolean> {
        const deletedFrequency = await this.FrequencyModel.findByIdAndDelete(id);
        if (!deletedFrequency) {
            throw new NotFoundException(`frequency with ID ${id} not found`);
        }
        return !!deletedFrequency;
    }
}
