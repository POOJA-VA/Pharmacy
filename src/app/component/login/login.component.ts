import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AppResponse } from "src/app/model/appResponse";
import { Login } from "src/app/model/login";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username: String = "";
  password: String = "";
  error: String = "";

  constructor(private authService: AuthService) {}

  login(_loginForm: NgForm): void {
    let login: Login = {
      username: this.username,
      password: this.password,
    };
    console.log(_loginForm.value);
    
    this.authService.login(_loginForm.value).subscribe({
      next: (response: AppResponse) => {
        this.authService.setLoggedIn(response.data);
      },
      error: (err) => {
        let message: String = err.error.error.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
      complete: () => console.log("There are no more action happen."),
    });
  }
}