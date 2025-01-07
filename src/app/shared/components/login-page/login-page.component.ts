import {Component} from '@angular/core';
import {UserService} from "../../../domains/user/user-service";
import {FormsModule} from "@angular/forms";
import {UserLoginResponse} from "../../../domains/user/dto/response/user-login-response";
import {AuthenticationUtils} from "../../authentication-utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {
  }

  onSubmit() {
    let request = {
      email: this.loginData.email,
      password: this.loginData.password
    };
    this.userService.login(request).subscribe((response: UserLoginResponse) => {
      AuthenticationUtils.initUsername(request.email);
      AuthenticationUtils.initAuthentication(response.token, response.expiresIn);
      this.router.navigate(['/home']);
    });
  }
}
