import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UserService} from "../../../domains/user/user-service";
import {AuthenticationUtils} from "../../authentication-utils";
import {Router} from "@angular/router";
import {UserRegisterResponse} from "../../../domains/user/dto/response/user-register-response";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      let formValue = this.registerForm.value;
      let request = {
        email: formValue.email,
        fullName: formValue.fullName,
        password: formValue.password
      };
      this.userService.register(request).subscribe((response: UserRegisterResponse) => {
        AuthenticationUtils.initUsername(request.email);
        AuthenticationUtils.initAuthentication(response.token, response.expiresIn);
        this.router.navigate(['/home']);
      })
    } else {
      console.log('Form is not valid');
    }
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value ? null : {passwordMismatch: true};
  };

}
