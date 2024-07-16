import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CheckListItem } from "../Models/checkListItem.model";
import { CreateCheckListItemDto, UpdateCheckListItemDto } from "../Models/dto/checkListItem.dto";

@Injectable()
export class CheckListItemService {
    constructor(@InjectModel(CheckListItem.name) private checkListItemModel: Model<CheckListItem>) {}

    async create(createCheckListItemDto: CreateCheckListItemDto): Promise<CheckListItem> {
        const createdCheckListItem = new this.checkListItemModel(createCheckListItemDto);
        return createdCheckListItem.save();
    }

    async findAll(): Promise<CheckListItem[]> {
        return this.checkListItemModel.find().exec();
    }

    async findOne(id: string): Promise<CheckListItem> {
        return this.checkListItemModel.findById(id).exec();
    }

    async update(id: string, updateCheckListItemDto: UpdateCheckListItemDto): Promise<CheckListItem> {
        return this.checkListItemModel.findByIdAndUpdate(id, updateCheckListItemDto, { new: true }).exec();
    }

    async delete(id: string): Promise<CheckListItem> {
        return this.checkListItemModel.findByIdAndDelete(id).exec();
    }
}

