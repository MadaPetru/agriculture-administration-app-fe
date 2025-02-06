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
import {BannerType} from "../../model/banner/banner-type";
import {BannerComponent} from "../banner/banner.component";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BannerComponent,
    NgIf
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  registerForm: FormGroup;
  userEmailAlreadyUsed: boolean = false;

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
      this.userService.register(request).subscribe({
        next: (response: UserRegisterResponse) => {
          AuthenticationUtils.initUsername(request.email);
          AuthenticationUtils.initAuthentication(response.token, response.expiresIn);
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          this.userEmailAlreadyUsed = true;
          setTimeout(() => {
            this.userEmailAlreadyUsed = false;
          }, this.get5SecondsInMs());
        }
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

  protected readonly BannerType = BannerType;

  private get5SecondsInMs() {
    return 5000;
  }
}
