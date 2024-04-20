import { ClassType } from "./classType.enum";
import { Employee } from "./employee.domain";
import { Subject } from "./subject.domain";

export type EmployeeSubject = {
    id: EmployeeSubjectID;
    classType: ClassType;
  };
  export type EmployeeSubjectID = {
    employee: Employee;
    subject: Subject;
  };