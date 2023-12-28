import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private authService: AuthService,private snackBar: MatSnackBar) {}

  login(loginForm: NgForm): void {
    let login: Login = {
      username: this.username,
      password: this.password,
    };
    console.log(loginForm.value);
    
    this.authService.login(loginForm.value).subscribe({
      next: (response: AppResponse) => {
        this.authService.setLoggedIn(response.data);
          this.openSnackBar('Login Successfully!!!', 'Close');
      },
      error: (err) => {
        let message: String = err.error.error.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
      complete: () => console.log("There are no more action happen."),
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Specify the duration for the snackbar (in milliseconds)
      panelClass: ['snackbar-custom-class'] // Optional: Apply custom styling via CSS class
    });
  }
  
}