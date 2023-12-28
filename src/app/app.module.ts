import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { CartComponent } from './component/cart/cart.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { AdminUserComponent } from './component/admin/user/user.component';
import { RegisterComponent } from './component/register/register.component';
import { CommonModule } from '@angular/common';
import { AdminProductComponent } from './component/admin/product/product.component';
import { AdminOrderComponent } from './component/admin/order/order.component';
import { OrderComponent } from './component/order/order.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminHomeComponent,
    AdminProductComponent,
    CartComponent,
    CategoryComponent,
    AdminOrderComponent,
    AdminUserComponent,
    RegisterComponent,
    OrderComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
