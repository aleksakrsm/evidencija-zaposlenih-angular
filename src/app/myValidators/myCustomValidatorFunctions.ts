import { AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function confirmedPassword() : ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if(!password?.touched && !confirmPassword?.touched){
            return null;
        }

        console.log("password; " + password!.getRawValue());
        console.log("confirm; " + confirmPassword!.getRawValue());
        if (!password || !confirmPassword || password.getRawValue() === confirmPassword.getRawValue()) {
          return null;
        }

        return {"password not confirmed":"password and confirm password do not match"};
    };
}