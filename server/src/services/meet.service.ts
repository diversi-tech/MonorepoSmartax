import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateMeetDto ,UpdateMeetDto } from "../Models/dto/meet .dto";
import { Meet } from "../Models/meet.model";
import { ValidationException } from "../common/exceptions/validation.exception";

@Injectable()
export class MeetService {

    constructor(@InjectModel('Meet') private readonly MeetModel: Model<Meet>) { }

    async createMeet(createMeetDto: CreateMeetDto): Promise<Meet> {
        const { address, date, beginningTime, endTime, usersId, clientDepartments } = createMeetDto;

        if (!address || !date || !beginningTime || !endTime || !usersId || !clientDepartments) {
            throw new ValidationException('Missing required fields');
        }

        const usersIdObjectIds = usersId.map(id => new Types.ObjectId(id));
        const clientDepartmentsObjectIds = clientDepartments.map(id => new Types.ObjectId(id));
        
        const createMeet = new this.MeetModel({
            address, 
            date, beginningTime, 
            endTime, 
            usersId:usersIdObjectIds, 
            clientDepartments:clientDepartmentsObjectIds });

        try{
            return await createMeet.save();

        }catch(error){
            console.log("error in save:\n"+error);
            return 
            
        }
    }

        async getALLMeetings(): Promise<Meet[]> {
            return await this.MeetModel.find().exec();
        }
        async updateMeet(updateMeetDto: UpdateMeetDto): Promise<Meet> {
            const {id, ...updateData } = updateMeetDto;
            const updatedMeet = await this.MeetModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedMeet) {
                throw new NotFoundException(`Meet with ID ${id} not found`);
            }
            return updatedMeet;
        }

        async deleteMeet(id: string): Promise<boolean> {
            const deletedMeet = await this.MeetModel.findByIdAndDelete(id);
            if (!deletedMeet) {
                throw new NotFoundException(`Meet with ID ${id} not found`);
            }
            return !!deletedMeet;
        }
        async searchMeet(id:string): Promise<Meet> {
            const meetings= await this.MeetModel.find({"_id":id}).exec();
            if (!meetings || meetings.length === 0) {
                throw new NotFoundException('Meet not found');
              }
              return meetings[0];
        }
}
