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
 
  register(_registerForm: Form): void {
    let user: Register = {
      name: this.user.name,
      password: this.user.password,
      username: this.user.username,
    };
 
    this.authService.register(user).subscribe({
      next: (_response: AppResponse) => {},
      error: (err: { error: { error: { message: string } } }) => {
        console.log(err);
        let message: string = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => {
        console.log('There are no more action happen.'),
          this.router.navigate(['/login'], { replaceUrl: true });
      },
    });
  }
}