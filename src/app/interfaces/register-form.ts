import { FormArray, FormControl } from '@angular/forms';

export interface RegisterForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
  passwordConfirm: FormControl<string | null>;
  // addresses: any;
}
