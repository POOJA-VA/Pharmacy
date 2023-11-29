import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { LoginComponent } from './component/login/login.component';
import { AdminUserComponent } from './component/admin/user/user.component';
import { authGuard } from './guard/auth.guard';
import { AdminProductComponent } from './component/admin/product/product.component';
import { AdminOrderComponent } from './component/admin/order/order.component';
import { RegisterComponent } from './component/register/register.component';
import { OrderComponent } from './component/order/order.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [authGuard] },

  {
    path: 'admin/orders',
    component: AdminOrderComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/product',
    component: AdminProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/user',
    component: AdminUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/category',
    component: CategoryComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
