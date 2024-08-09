import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CheckList } from "../Models/checkList.model";
import { CreateCheckListDto, UpdateCheckListDto } from "../Models/dto/checkList.dto";

@Injectable()
export class CheckListService {

  constructor(@InjectModel(CheckList.name) private checkListModel: Model<CheckList>) { }

  async create(createCheckListDto: CreateCheckListDto): Promise<CheckList> {
    try{const createdCheckList = new this.checkListModel(createCheckListDto);
    return createdCheckList.save();}
    catch(err){
      console.log(err);
      
    }

  }

  async findAll(): Promise<CheckList[]> {
    return this.checkListModel.find().exec();
  }

  async findOne(id: string): Promise<CheckList> {
    return this.checkListModel.findById(id).exec();
  }

  async update(id: string, updateCheckListDto: UpdateCheckListDto): Promise<CheckList> {
    try {
      return this.checkListModel.findByIdAndUpdate(id, updateCheckListDto, { new: true }).exec();

    } catch (err) {
      console.log(err);

    }
  }

  async delete(id: string): Promise<CheckList> {
    return this.checkListModel.findByIdAndDelete(id).exec();
  }
}
