import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user/user.controller';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';
import { TasksController } from './controller/tasks/tasks.controller';
import { CommunicationsController } from './controller/communications/communications.controller';
import { BillingController } from './controller/billing/billing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { User, UserModel } from './Models/user.model';
import { GoogleDriveController } from './controller/google-drive/google-drive.controller';
import { GoogleDriveService } from './services/google-drive.service';
import { CommunicationsService } from './services/communication.service';
import { ScheduleModule } from '@nestjs/schedule';
import {
  Communication,
  communicationModel,
} from './Models/communication.model';
import { APP_FILTER, NestFactory } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters/http-error.filter';
import { ClientController } from './controller/clients/clients.controller';
import { Client, ClientModel } from './Models/client.model';
import { ClientService } from './services/client.service';
import { Docs, DocumentsModel } from './Models/doc.model';
import { BillingsService } from './services/billing.service';
import { Billing, BillingModel } from './Models/billing.model';
import {
  BillingStatus,
  BillingStatusModel,
} from './Models/billingStatus.model';
import { BillingStatusService } from './services/billingStatus';
import { BillingStatusController } from './controller/billingStatus/billingStatus.controller';
//add
import { MailController } from './services/mail/mail.controller';
import { MailService } from './services/mail/mail.service';
import { TokenService } from './services/jwt.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { hashPasswordService } from './services/hash-password';
import { AuthController } from './controller/auth/auth.controller';
import { RoleService } from './services/role.service';
import { RoleController } from './controller/role/role.controller';
import { Role, RoleModel } from './Models/role.modle';
import { ClientTypeController } from './controller/clientTypes/clientTypes.controller';
import { ClientType, ClientTypeModel } from './Models/clientType.model';
import { ClientTypeService } from './services/clientType.service';
import { PriorityController } from './controller/priority/priority.controller';
import { MeetService } from './services/meet.service';
import { Meet, MeetModel } from './Models/meet.model';
import { MeetController } from './controller/meet/meet.controller';
import { TaskService } from './services/task.service';
import { Task, TaskModel } from './Models/task.model';
import { Tag, TagModel } from './Models/tag.model';
import { TagController } from './controller/tag/tag.controller';
import { TagService } from './services/tag.service';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Status, StatusModel } from './Models/status.model';
import { Priority, PriorityModel } from './Models/priority.model';
import { StatusController } from './controller/status/status.controller';
import { StatusService } from './services/status.service';
import { PriorityService } from './services/priority.service';
import { CommunicationArchiveController } from './controller/communicationArchive/communicationArchive.controler';
import {
  CommunicationArchive,
  communicationArchiveModel,
} from './Models/communicationArchive.model';
import { CommunicationArchiveService } from './services/communicationArchive.service';
import { DocTypeController } from './controller/docTypes/docTypes.controller';
import { DocTypeService } from './services/docTypes.service';
import { DocType, docTypeModel } from './Models/docType.model';
import { CallTopicController } from './controller/callTopicSchema/callTopicSchema.controller';
import { CallTopicService } from './services/callTopicSchema.service';
import {
  callTopicSchema,
  callTopicSchemaModel,
} from './Models/callTopicSchema.model';
import { FieldService } from './services/field.service';
import { FieldController } from './controller/field/field.controller';
import { Field, FieldModell } from './Models/field.model';
import { Timer, TimerModel } from './Models/timer.model';
import { TimerController } from './controller/timer/timer.controller';
import { TimerService } from './services/timer.service';


import { FrequencyController } from './controller/frequency/frequency.controller';
import { Frequency, frequencyModel } from './Models/frequency.model';
import { FrequencyService } from './services/frequency.service';
import { PaymentMethodController } from './controller/paymentMethod/paymentMethod.controller';
import { PaymentMethodService } from './services/PaymentMethod.service';
import {
  PaymentMethod,
  PaymentMethodModel,
} from './Models/paymentMethod.model';
import { PaymentDetailsController } from './controller/paymentDetails/paymentDetails.controller';
import { PaymentDetailsService } from './services/paymentDetails.service';
import {
  PaymentDetails,
  PaymentDetailsModel,
} from './Models/paymentDetails.model';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controller/payment/payment.controller';
import { Payment, PaymentModel } from './Models/payment.model';
import { StepFieldController } from './controller/yearlyReport/stepField.controller';
import { YearlyReportController } from './controller/yearlyReport/yearlyReport.controller';
import { StepFieldService } from './services/stepField.service';
import { YearlyReportService } from './services/yearlyReport.service';
import { StepField, stepFieldModel } from './Models/stepField.model';
import {
  YearlyReport,
  YearlyReportstModel,
} from './Models/yearlyReports.model';
import { Year, YearModel } from './Models/year.model';
import { YearService } from './services/year.service';
import { YearController } from './controller/year/year.controller';
import { ClientField, ClientFieldModel } from './Models/clientField.model';
import { ClientFieldController } from './controller/clientField/clientField.controller';
import { ClientFieldService } from './services/clientField.service';
import {
  CheckListItem,
  CheckListItemModel,
} from './Models/checkListItem.model';
import { CheckList, CheckListModel } from './Models/checkList.model';
import { CheckListService } from './services/checkList.service';
import { CheckListItemService } from './services/checkListItem.service';
import { CheckListItemController } from './controller/checkListItem/checkListItem.controller';
import { CheckListController } from './controller/checkList/checkList.controller';
import { SensitiveDataController } from './controller/sensitiveData/sensitiveData.controller';
import {
  SensitiveData,
  SensitiveDataModel,
} from './Models/sensitiveData.model';
import { SensitiveDataService } from './services/sensitiveData.service';
import { importClientsController } from './controller/importClients/importClients.controller';
import { TableController } from './controller/table/table.controller';
import { TableService } from './services/table.service';
import { RepeatableTask, RepeatableTaskModel } from './Models/repeatableTask.model';
import { RepeatableTaskController } from './controller/repeatableTask/repeatableTask.controller';
import { repeatableTaskService } from './services/repeatableTask.service';
import { TasksGateway } from './services/socket/socket.gateway';
import { TaxRefundsService } from './services/taxRefunds.service';
import { TaxRefundsController } from './controller/taxRefunds/taxRefunds.controller';
import { taxRefundsModel, TaxRefunds } from './Models/taxRefunds.model';
import { YearArchive, YearArchiveModel } from './Models/yearArchive.model';
import { YearArchiveController } from './controller/yearArchive/yearArchive.controller';
import { YearArchiveService } from './services/yearArchive.service';
import { FinancialStatement, FinancialStatementModel } from './Models/financialStatement.model';
import { FinancialStatementController } from './controller/financialStatement/financialStatement.controller';
import { FinancialStatementService } from './services/financialStatement.service';
import { MonthlyReportService } from './services/monthlyReport.service';
import { MonthlyReportController } from './controller/monthlyReport/monthlyReport.controller';
import { MonthlyReportModel,MonthlyReport } from './Models/monthlyReport.model';
import { StepFieldMonthController } from './controller/stepFieldMonth/stepFieldMonth.controller';
import { StepFieldMonthService } from './services/stepFieldMonth.service';
import { StepFieldMonth, stepFieldMonthModel } from './Models/stepFieldMonth.model';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI),
  MongooseModule.forFeature([{ name: ClientField.name, schema: ClientFieldModel }]),
  MongooseModule.forFeature([{ name: Field.name, schema: FieldModell }]),
  MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
  MongooseModule.forFeature([{ name: YearArchive.name, schema: YearArchiveModel }]),
  MongooseModule.forFeature([{ name: ClientType.name, schema: ClientTypeModel },]),
  MongooseModule.forFeature([{ name: Client.name, schema: ClientModel }]),
  MongooseModule.forFeature([{ name: SensitiveData.name, schema: SensitiveDataModel },]),
  MongooseModule.forFeature([{ name: Billing.name, schema: BillingModel }]),
  MongooseModule.forFeature([{ name: BillingStatus.name, schema: BillingStatusModel },]),
  MongooseModule.forFeature([{ name: Communication.name, schema: communicationModel },]),
  MongooseModule.forFeature([{ name: Role.name, schema: RoleModel }]),
  MongooseModule.forFeature([{ name: Docs.name, schema: DocumentsModel }]),
  MongooseModule.forFeature([{ name: DocType.name, schema: docTypeModel }]),
  MongooseModule.forFeature([{ name: Task.name, schema: TaskModel }]),
  MongooseModule.forFeature([{ name: Tag.name, schema: TagModel }]),
  MongooseModule.forFeature([{ name: Meet.name, schema: MeetModel }]),
  MongooseModule.forFeature([{ name: Status.name, schema: StatusModel }]),
  MongooseModule.forFeature([{ name: Priority.name, schema: PriorityModel }]),
  MongooseModule.forFeature([{ name: callTopicSchema.name, schema: callTopicSchemaModel },]),
  MongooseModule.forFeature([{ name: Status.name, schema: StatusModel }]),
  MongooseModule.forFeature([{ name: Priority.name, schema: PriorityModel }]),
  MongooseModule.forFeature([{ name: callTopicSchema.name, schema: callTopicSchemaModel },]),
  MongooseModule.forFeature([{ name: Frequency.name, schema: frequencyModel },]),
  MongooseModule.forFeature([{ name: PaymentMethod.name, schema: PaymentMethodModel },]),
  MongooseModule.forFeature([{ name: PaymentDetails.name, schema: PaymentDetailsModel },]),
  MongooseModule.forFeature([{ name: Payment.name, schema: PaymentModel }]),
  MongooseModule.forFeature([{ name: Timer.name, schema: TimerModel }]),
  MongooseModule.forFeature([{ name: RepeatableTask.name, schema: RepeatableTaskModel }]),
  MongooseModule.forFeature([{ name: Frequency.name, schema: frequencyModel }]),
  ServeStaticModule.forRoot({ rootPath: path.join(__dirname, '../uploads'), serveRoot: '/uploads', }), 
  MongooseModule.forFeature([{ name: CommunicationArchive.name, schema: communicationArchiveModel },]),
  MongooseModule.forFeature([{ name: StepField.name, schema: stepFieldModel },]),
  MongooseModule.forFeature([{ name: CommunicationArchive.name, schema: communicationArchiveModel },]),
  MongooseModule.forFeature([{ name: YearlyReport.name, schema: YearlyReportstModel },]),
  MongooseModule.forFeature([{ name: Year.name, schema: YearModel }]),
  MongooseModule.forFeature([{ name: CheckListItem.name, schema: CheckListItemModel },]),
  MongooseModule.forFeature([{ name: CheckList.name, schema: CheckListModel },]),
  MongooseModule.forFeature([{ name: CommunicationArchive.name, schema: communicationArchiveModel },]),
  MongooseModule.forFeature([{ name: TaxRefunds.name, schema: taxRefundsModel },]),
  MongooseModule.forFeature([
    { name: FinancialStatement.name, schema: FinancialStatementModel },
    { name: MonthlyReport.name, schema: MonthlyReportModel },
  ]),
  MongooseModule.forFeature([
    { name: StepFieldMonth.name, schema: stepFieldMonthModel },
  ]),
    JwtModule,
  ScheduleModule.forRoot(),

  ],
  controllers: [
    YearArchiveController,
    AppController,
    CheckListItemController,
    CheckListController,
    FieldController,
    ClientTypeController,
    CallTopicController,
    UserController,
    PriorityController,
    ClientController,
    TasksController,
    CommunicationsController,
    BillingController,
    BillingStatusController,
    MailController,
    GoogleDriveController,
    AuthController,
    RoleController,
    TasksController,
    TagController,
    MeetController,
    StatusController,
    DocTypeController,
    FrequencyController,
    PaymentMethodController,
    PaymentDetailsController,
    PaymentController,
    ClientFieldController,
    TimerController,
    CommunicationArchiveController,
    YearController,
    YearlyReportController,
    StepFieldController,
    SensitiveDataController,
    importClientsController,
    TableController,
    RepeatableTaskController,
    FrequencyController,
    TaxRefundsController,
    FinancialStatementController,
    MonthlyReportController,
    StepFieldMonthController
  ],

  providers: [
    AppService,
    UserService,
    MailService,
    YearArchiveService,
    TokenService,
    hashPasswordService,
    JwtService,
    ClientService,
    ClientTypeService,
    FieldService,
    TaskService,
    TagService,
    StatusService,
    PriorityService,
    CommunicationsService,
    GoogleDriveService,
    BillingsService,
    BillingStatusService,
    RoleService,
    MeetService,
    CallTopicService,
    CommunicationArchiveService,
    CheckListService,
    CheckListItemService,
    DocTypeService,
    TimerService,
    FrequencyService,
    PaymentMethodService,
    PaymentDetailsService,
    PaymentService,
    SensitiveDataService,
    ClientFieldService,
    repeatableTaskService,
    TaxRefundsService,
    FinancialStatementService,
    StepFieldMonthService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    CommunicationArchiveService,
    MonthlyReportService,
    StepFieldService,
    YearlyReportService,
    YearService,
    TableService,
    TasksGateway,
    StepFieldMonthService
  ],
})
export class AppModule { }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('yourTag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    // origin: 'http://localhost:4200',
    origin: 'https://monoreposmartax-fronted.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Authorization, Content-Type',
  });
  await app.listen(8080);
}
bootstrap();
