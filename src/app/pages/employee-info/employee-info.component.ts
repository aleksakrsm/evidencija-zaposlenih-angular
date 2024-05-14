import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Department } from '../../domain/department.domain';
import { Employee } from '../../domain/employee.domain';
import { AcademicTitle } from '../../domain/academicTitle.domain';
import { EducationTitle } from '../../domain/educationTitle.domain';
import { validCmbSelection, validCmbSelectionInitial } from '../../myValidators/myCustomValidatorFunctions';
import { Status } from '../../domain/status.enum';
import { DateHeplerService } from '../../service/dateHelper.service';
@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss',
})
export class EmployeeInfoComponent implements OnInit {
  @Input() academicTitles: AcademicTitle[] = [];
  @Input() educationTitles: EducationTitle[] = [];
  @Input() departments: Department[] = [];
  @Input() showStatus: boolean = true;

  @Input() set employee({
    status,
    firstname,
    lastname,
    birthday,
    academicTitle,
    educationTitle,
    department,
  }: Employee) {
    let queue = birthday as unknown as [year:number,month:number,dayOfMonth:number];
    let dateOfBirth:Date = new Date(Date.UTC(queue[0],queue[1]-1,queue[2])); 
    this.employeeForm.patchValue({
      firstname: firstname,
      lastname: lastname,
      birthday:dateOfBirth.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      academicTitle: academicTitle.name,
      educationTitle: educationTitle.name,
      department: department.shortName,
      status: status,
    });
  }

  @Output() employeeEmitter = new EventEmitter<Employee>();
  constructor(private formBuilder: FormBuilder,private dateHelper:DateHeplerService) {}

  employeeForm: FormGroup = this.formBuilder.group({
    status: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    firstname: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastname: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    birthday: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    academicTitle: this.formBuilder.control('-- Select --', {
      nonNullable: true,
      validators: [Validators.required, validCmbSelection(),validCmbSelectionInitial()],
    }),
    educationTitle: this.formBuilder.control('-- Select --', {
      nonNullable: true,
      validators: [Validators.required, validCmbSelection(),validCmbSelectionInitial()],
    }),
    department: this.formBuilder.control('-- Select --', {
      nonNullable: true,
      validators: [Validators.required, validCmbSelection(),validCmbSelectionInitial()],
    }),
  });

  ngOnInit(): void {
    this.employeeForm.get('status')?.setValue('ACTIVE');
  }


  saveEmployee(): void {
    let firstname = (
      this.employeeForm.get('firstname')?.getRawValue() as string
    ).trim();
    let lastname = (
      this.employeeForm.get('lastname')?.getRawValue() as string
    ).trim();

    const birthdayInputElement = document.getElementById(
      'birthday'
    ) as HTMLInputElement;
    const formattedDate = birthdayInputElement.value;
    const parts = formattedDate.split('.');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[0]);
    const convertedDate = new Date(year, month - 1, day);
    // const convertedDate = this.dateHelper.formatedStringToDate(formattedDate);

    let birthday = convertedDate;
    let departmentN = this.findDEP(
      (this.employeeForm.get('department')?.getRawValue() as string).trim()
    );
    let department: Department =
      departmentN == null ? { id: -1, name: '', shortName: '' } : departmentN;
    let atN = this.findAT(
      (this.employeeForm.get('academicTitle')?.getRawValue() as string).trim()
    );
    let at: AcademicTitle = atN == null ? { id: -1, name: '' } : atN;
    let etN = this.findET(
      (this.employeeForm.get('educationTitle')?.getRawValue() as string).trim()
    );
    let et: EducationTitle = etN == null ? { id: -1, name: '' } : etN;
    let employee: Employee = {
      firstname: firstname,
      lastname: lastname,
      birthday: birthday,
      academicTitle: at,
      educationTitle: et,
      department: department,
      status: Status.Active,
    };
    this.employeeEmitter.emit(employee);
  }

  onBirthdayBlur() {
    const birthdayInputElement = document.getElementById(
      'birthday'
    ) as HTMLInputElement;
    const selectedDate = new Date(birthdayInputElement?.value);
    if (!this.employeeForm.get('birthday')!.value) {
      this.employeeForm.get('birthday')!.setValue(null);
    }
    if (birthdayInputElement) {
      birthdayInputElement.type = 'text';
    }
    // const formattedDate = selectedDate.toLocaleDateString('de-DE', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // });
    // birthdayInputElement.value = formattedDate;
    birthdayInputElement.value = this.dateHelper.formatDateToString(selectedDate);
  }

  onBirthdayFocus() {
    const birthdayInputElement = document.getElementById(
      'birthday'
    ) as HTMLInputElement;
    const formattedDate = birthdayInputElement.value;
    // const parts = formattedDate.split('.');
    // const year = parseInt(parts[2]);
    // const month = parseInt(parts[1]);
    // const day = parseInt(parts[0]);
    // const convertedDate = new Date(Date.UTC(year,month-1,day));
    const convertedDate = this.dateHelper.formatedStringToDate(formattedDate);
    if (birthdayInputElement) {
      birthdayInputElement.type = 'date';
    }
    birthdayInputElement.valueAsDate = convertedDate;
  }

  private findET(title: string | null): EducationTitle | null {
    if (title == null) return null;
    let et = this.educationTitles.find((x) => x.name === title);
    return et || null;
  }
  private findAT(title: string | null): AcademicTitle | null {
    if (title == null) return null;
    let at = this.academicTitles.find((x) => x.name === title);
    return at || null;
  }
  private findDEP(title: string | null): Department | null {
    if (title == null) return null;
    let dep = this.departments.find((x) => x.shortName === title);
    return dep || null;
  }
}
