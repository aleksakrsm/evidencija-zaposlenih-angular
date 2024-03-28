import { Status } from "./status.enum";

export type EmployeeFilter = {
  academicTitleId: number;
  educationTitleId: number;
  departmentId: number;
  status: Status;
};
