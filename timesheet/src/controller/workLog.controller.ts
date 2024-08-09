// import { Controller } from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices';
// import { WorkLogService } from '../service/workLog.service';
// import { UpdateWorkLogDto, UpdateTimeEntryDto } from '../dto/workLog.dto';
// import { WorkLog } from '../model/workLog.model';

// @Controller('worklogs')
// export class WorkLogController {

//   constructor(private readonly workLogService: WorkLogService) { }

//   @MessagePattern({ cmd: 'create' })
//   async create(data: any): Promise<{ data: WorkLog }> {
//     if (!data.date || !data.employeeId) {
//       throw new Error('Missing required fields: date and employeeId');
//     }
//     const workLog = await this.workLogService.create(data);
//     return { data: workLog };
//   }

//   @MessagePattern({ cmd: 'update' })
//   async update(data: { id: string, updateWorkLogDto: UpdateWorkLogDto }): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.update(data.id, data.updateWorkLogDto);
//     return { data: workLog };
//   }

//   @MessagePattern({ cmd: 'updateTimeEntry' })
//   async updateTimeEntry(data: { id: string, updateTimeEntryDto: UpdateTimeEntryDto }): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.updateTimeEntry(data.id, data.updateTimeEntryDto);
//     return { data: workLog };
//   }

//   @MessagePattern({ cmd: 'findOne' })
//   async findOne(data: { id: string }): Promise<{ data: WorkLog }> {
//     const workLog = await this.workLogService.findOne(data.id);
//     return { data: workLog };
//   }

//   @MessagePattern({ cmd: 'findAll' })
//   async findAll(): Promise<{ data: WorkLog[] }> {
//     const workLogs = await this.workLogService.findAll();
//     return { data: workLogs };
//   }

//   @MessagePattern({ cmd: 'findByEmployeeId' })
//   async findByEmployeeId(data: { employeeId: string }): Promise<{ data: WorkLog[] }> {
//     const workLogs = await this.workLogService.findByEmployeeId(data.employeeId);
//     return { data: workLogs };
//   }

//   @MessagePattern({ cmd: 'export' })
//   async exportWorkLogs(data: { month: number, year: number }): Promise<Buffer> {
//     const { month, year } = data;
//     try {
//       const buffer = await this.workLogService.exportWorkLogs(month, year);
//       if (!buffer) {
//         throw new Error('Buffer is undefined');
//       }
//       return buffer;
//     } catch (error) {
//       console.error('Error exporting work logs:', error);
//       throw error;
//     }
//   }

//   @MessagePattern({ cmd: 'exportForEmployee' })
//   async exportWorkLogsForEmployee(data: { employeeId: string, month: number, year: number }): Promise<Buffer> {
//     const { employeeId, month, year } = data;
//     try {
//       const buffer = await this.workLogService.exportWorkLogsForEmployee(employeeId, month, year);
//       if (!buffer) {
//         throw new Error('Buffer is undefined');
//       }
//       return buffer;
//     } catch (error) {
//       console.error('Error exporting work logs for employee:', error);
//       throw error;
//     }
//   }
// }
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WorkLogService } from '../service/workLog.service';
import { UpdateWorkLogDto, UpdateTimeEntryDto } from '../dto/workLog.dto';
import { WorkLog } from '../model/workLog.model';

@Controller('worklogs')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @MessagePattern({ cmd: 'create' })
  async create(data: any): Promise<{ data: WorkLog }> {
    try {
      if (!data.date || !data.employeeId) {
        throw new Error('Missing required fields: date and employeeId');
      }
      const workLog = await this.workLogService.create(data);
      return { data: workLog };
    } catch (error) {
      console.error('Error creating work log:', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'update' })
  async update(data: { id: string; updateWorkLogDto: UpdateWorkLogDto }): Promise<{ data: WorkLog }> {
    try {
      const workLog = await this.workLogService.update(data.id, data.updateWorkLogDto);
      return { data: workLog };
    } catch (error) {
      console.error('Error updating work log:', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'updateTimeEntry' })
  async updateTimeEntry(data: { id: string; updateTimeEntryDto: UpdateTimeEntryDto }): Promise<{ data: WorkLog }> {
    try {
      const workLog = await this.workLogService.updateTimeEntry(data.id, data.updateTimeEntryDto);
      return { data: workLog };
    } catch (error) {
      console.error('Error updating time entry:', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(data: { id: string }): Promise<{ data: WorkLog }> {
    try {
      const workLog = await this.workLogService.findOne(data.id);
      return { data: workLog };
    } catch (error) {
      console.error('Error finding work log:', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll(): Promise<{ data: WorkLog[] }> {
    try {
      const workLogs = await this.workLogService.findAll();
      return { data: workLogs };
    } catch (error) {
      console.error('Error finding all work logs:', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'findByEmployeeId' })
  async findByEmployeeId(data: { employeeId: string }): Promise<{ data: WorkLog[] }> {
    try {
      const workLogs = await this.workLogService.findByEmployeeId(data.employeeId);
      return { data: workLogs };
    } catch (error) {
      console.error('Error finding work logs by employee ID:', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'export' })
  async exportWorkLogs(data: { month: number; year: number }): Promise<Buffer> {
    const { month, year } = data;
    try {
      const buffer = await this.workLogService.exportWorkLogs(month, year);
      if (!buffer) {
        throw new Error('Buffer is undefined');
      }
      return buffer;
    } catch (error) {
      console.error('Error exporting work logs:', error.message);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'exportForEmployee' })
  async exportWorkLogsForEmployee(data: { employeeId: string; month: number; year: number }): Promise<Buffer> {
    const { employeeId, month, year } = data;
    try {
      const buffer = await this.workLogService.exportWorkLogsForEmployee(employeeId, month, year);
      if (!buffer) {
        throw new Error('Buffer is undefined');
      }
      return buffer;
    } catch (error) {
      console.error('Error exporting work logs for employee:', error.message);
      throw error;
    }
  }
}
