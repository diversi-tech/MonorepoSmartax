import { Test, TestingModule } from '@nestjs/testing';
import { YearlyReportController } from '../../../server/src/controller/yearlyReport/yearlyReport.controller';
import { YearlyReportService } from '../../../server/src/services/yearlyReport.service';
import { CreateYearlyReportDto } from '../../../server/src/Models/dto/yearlyReport.dbo';
import { YearlyReport } from '../../../server/src/Models/yearlyReports.model';
import { Status } from 'server/src/Models/status.model';

describe('YearlyReportController', () => {
  let yearlyReportController: YearlyReportController;
  let yearlyReportService: YearlyReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YearlyReportController],
      providers: [
        {
          provide: YearlyReportService,
          useValue: {
            createYearlyReport: jest.fn(),
          },
        },
      ],
    }).compile();

    yearlyReportController = module.get<YearlyReportController>(YearlyReportController);
    yearlyReportService = module.get<YearlyReportService>(YearlyReportService);
  });

  it('should be defined', () => {
    expect(yearlyReportController).toBeDefined();
  });

  describe('create', () => {
    it('should create a yearly report', async () => {
      const createDto: CreateYearlyReportDto = {
        idClient: '',
        assignee: [],
        idEmploye: '',
        yearReport: '',
        dateTime: new Date(),
        price: 0,
        paymentAmountPaid: 0,
        balanceDue: 0,
        stepsList: [],
        entityType: '',
        status: new Status()
      };

      const result: YearlyReport = {
        _id: 'someId',
        idClient: '',
        assignee: [],
        idEmploye: '',
        yearReport: '',
        dateTime: new Date(),
        price: 0,
        paymentAmountPaid: 0,
        balanceDue: 0,
        stepsList: [],
        entityType: '',
        status: new Status()
      } as YearlyReport;

      jest.spyOn(yearlyReportService, 'createYearlyReport').mockResolvedValue(result);

      expect(await yearlyReportController.create(createDto)).toBe(result);
    });
  });
});
