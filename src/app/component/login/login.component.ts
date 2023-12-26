import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppResponse } from "src/app/model/appResponse";
import { Login } from "src/app/model/login";
import { AuthService } from "src/app/service/auth.service";
import { ToasterServiceService } from "src/app/service/toaster-service.service";
import { ToasterService } from "src/app/service/toaster.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username: String = "";
  password: String = "";
  error: String = "";

  constructor(private authService: AuthService,private toaster:ToastrService) {}

  login(loginForm: NgForm): void {
    let login: Login = {
      username: this.username,
      password: this.password,
    };
    console.log(loginForm.value);
    
    this.authService.login(loginForm.value).subscribe({
      next: (response: AppResponse) => {
        this.authService.setLoggedIn(response.data);
        this.toaster.success("Login Successfully");
      },
      error: (err) => {
        let message: String = err.error.error.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
      complete: () => console.log("There are no more action happen."),
    });
  }
}