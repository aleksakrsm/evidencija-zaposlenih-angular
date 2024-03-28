import { AcademicTitle } from "./academicTitle.domain";
import { Department } from "./department.domain";
import { EducationTitle } from "./educationTitle.domain";
import { Status } from "./status.enum";

export type Employee = {
  id: number;
  firstname: string;
  lastname: string;
  birthday:Date;
  department: Department;
  academicTitle:AcademicTitle;
  educationTitle:EducationTitle;
  status:Status;
}