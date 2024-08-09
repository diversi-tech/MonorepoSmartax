import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkLogController } from './controller/workLog.controller';
import { WorkLogService } from './service/workLog.service';
import { WorkLogModel, WorkLog } from './model/workLog.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: WorkLog.name, schema: WorkLogModel }]),
  ],
  controllers: [WorkLogController],
  providers: [WorkLogService],
})
export class TimesheetModule { }
