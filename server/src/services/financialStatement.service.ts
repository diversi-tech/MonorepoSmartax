import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidationException } from 'server/src/common/exceptions/validation.exception';
import { CreateFinancialStatementDto } from '../Models/dto/financialStatement.dto';
import { FinancialStatement } from '../Models/financialStatement.model';
import { StepField } from '../Models/stepField.model';
import { UpdateFinancialStatementDto } from '../Models/dto/financialStatement.dto';

@Injectable()
export class FinancialStatementService {

    constructor(@InjectModel('FinancialStatement') private readonly FinancialStatementModel: Model<FinancialStatement>,
                 @InjectModel('StepField') private readonly stepFieldModel: Model<StepField>) {}

    async createFinancialStatement(createFinancialStatementDto: CreateFinancialStatementDto): Promise<FinancialStatement> {
        const allStepFields = await this.stepFieldModel.find().exec();
        const filteredStepFields = allStepFields.filter(stepField => stepField.type === 'financial-statement');
                  
        const createdFinancialStatement = new this.FinancialStatementModel({
             ...createFinancialStatementDto,
             stepsList: filteredStepFields,
        });
                  
        return createdFinancialStatement.save();
    }

    async updateFinancialStatement(id: string, updateFinancialStatementDto: UpdateFinancialStatementDto): Promise<FinancialStatement> {
        const updatedFinancialStatement = await this.FinancialStatementModel.findByIdAndUpdate(
            id,
            updateFinancialStatementDto,
            // { new: true }
        ).exec();

        if (!updatedFinancialStatement) {
            throw new NotFoundException('Financial Statement not found');
        }

        return updatedFinancialStatement.save();
    }

    async deleteFinancialStatement(id: string): Promise<void> {
        const result = await this.FinancialStatementModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Financial Statement not found');
        }
    }

    async getAllFinancialStatements(): Promise<FinancialStatement[]> {
        return this.FinancialStatementModel.find().exec();
    }
}