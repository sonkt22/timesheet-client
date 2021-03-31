import {
  Controller,
  Logger,
  Post,
  Body,
  OnModuleInit,
  Get,
  Query,
  Put,
  Delete,
  Headers,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { ITimesheetController } from 'src/grpc.interface';
import { microserviceOptions } from '../grpc.options';
import { Observable } from 'rxjs';

@Controller('timesheet')
export class TimesheetController implements OnModuleInit {
  private logger = new Logger('TimesheetController');

  @Client(microserviceOptions) // <-- Add
  private client: ClientGrpc; // <-- this

  private grpcTimesheetService: ITimesheetController;

  // constructor(private mathService: MathService) {} // <-- Remove this

  onModuleInit() {
    // <--
    this.grpcTimesheetService = this.client.getService<ITimesheetController>(
      'TimesheetController',
    ); // <-- Add this
  } // <--

  // @Post('add')
  // async accumulate(@Body('data') data: number[]) {
  //   this.logger.log('Adding ' + data.toString());
  //   // return this.mathService.accumulate(data);  // <-- Change this
  //   return this.grpcService.accumulate({ data }); // <-- to this
  // }

  @Get()
  findTimesheetById(@Query('timesheetId') timesheetId: string) {
    const a = this.grpcTimesheetService.findTimesheetById({ timesheetId });
    return a;
  }

  @Get('/findall')
  findAll() {
    const a = this.grpcTimesheetService.findAll({});
    Logger.log(a);
    return a;
  }

  @Post('/create')
  createTimesheet(@Body() createTimesheetInput) {
    const a = this.grpcTimesheetService.createTimesheet(createTimesheetInput);
    return a;
  }
}
