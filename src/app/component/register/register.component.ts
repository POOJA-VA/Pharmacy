import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  options: AnimationOptions = {
    path: '/assets/login_lottie.json',
  };
  confirmPassword: string = '';
  error: string = '';
  user: Register = {
    name: '',
    username: '',
    password: '',
  };
 
  onSubmit(registerForm: NgForm) {
    registerForm.resetForm();
  }
 
  register(registerForm: Form): void {
    let user: Register = {
      name: this.user.name,
      password: this.user.password,
      username: this.user.username,
    };
 
    this.authService.register(user).subscribe({
      next: (response: AppResponse) => {},
    });
  }
}