import { AcademicTitle } from './academicTitle.domain';
import { Employee } from './employee.domain';

export type EmployeeAcademicTitle = {
  historyItemIdDto: EmployeeAcademicTitleID;
  // beginDate?: Date;
  endDate?: Date;
};
export type EmployeeAcademicTitleID = {
  employee: Employee;
  academicTitle: AcademicTitle;
  beginDate: Date;
};
