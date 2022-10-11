import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterForm } from '../interfaces/register-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup<RegisterForm>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        userName: ['', [Validators.required, Validators.pattern('^[^\\s]+$')]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
            ),
            Validators.minLength(8),
            Validators.maxLength(12),
          ],
        ],
        passwordConfirm: ['', [Validators.required]],
        // addresses: this.fb.array([this.addressFormGroup()]),
      },
      {
        validators: this.confirmMatchPassWord('password', 'passwordConfirm'),
      }
    );
  }
  private confirmMatchPassWord(confirm: string, password: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      if (
        formGroup.controls[password].value !== formGroup.controls[confirm].value
      ) {
        return { noMatch: true };
      } else {
        return null;
      }
    };
  }
  // addressFormGroup(): FormGroup {
  //   return this.fb.group({
  //     address: ['', [Validators.required]],
  //     street: ['', [Validators.required]],
  //     country: ['', [Validators.required]],
  //     city: ['', [Validators.required]],
  //   });
  // }

  // addAddress() {
  //   const addressForm = this.form.get('addresses') as FormArray;
  //   if (addressForm.length < 3) {
  //     addressForm.push(this.addressFormGroup());
  //   }
  // }

  // deleteAddress(index: number) {
  //   const addressForm = this.form.get('addresses') as FormArray;
  //   addressForm.removeAt(index);
  // }

  get name() {
    return this.form.get('name');
  }
  get userName() {
    return this.form.get('userName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }
  // get addresses(): FormArray {
  //   return this.form.controls['addresses'] as FormArray;
  // }

  ngOnInit(): void {}

  handleSubmit() {
    console.log(this.form);
  }
}
