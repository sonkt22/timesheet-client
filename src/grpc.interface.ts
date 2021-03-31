import { Observable } from 'rxjs';

export interface ITimesheetController {
  //Customer
  findTimesheetById(findOneInput: FindOneInput): Observable<any>;
  findAll(fInput: FindAllInput): Observable<any>;
  createTimesheet(createTimesheet: CreateTimesheet): Observable<any>;
}

interface FindOneInput {
  timesheetId: string;
}

interface CreateTimesheet {
  customerId: string;
  employeeId: string;
  authorId: string;
  serviceId: string;
  invoiceId: string;
  startTime: Date;
  endTime: Date;
  changeTime: Date;
  createdAt: string;
  note: string;
  status: number;
}
export interface FindAllInput {}
