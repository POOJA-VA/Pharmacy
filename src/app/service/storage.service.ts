import { Injectable } from "@angular/core";
import { AppUser } from "../model/appUser";
import { Cart } from "../model/cart";
import { Order } from "../model/order";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  public setLoggedInUser(user: AppUser): void {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }

  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  }

  public removeLoggedInUser(): void {
    localStorage.removeItem("loggedInUser");
  }

  public setRoute(route: string | null): void {
    if (route !== null) localStorage.setItem("route", route);
  }

  public getRoute(): string | null {
    return localStorage.getItem("route");
  }

  public removeRoute(): void {
    localStorage.removeItem("route");
  }

  public setAuthData(authData: string) {
    localStorage.setItem("authData", authData);
  }

  public getAuthData(): string | null {
    return localStorage.getItem("authData");
  }
  
  public removeAuthData(): void {
    localStorage.removeItem("authData");
  }

  public setCart(cart: Cart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

 public setOrder(order: Order[]): void{
    localStorage.setItem('orders', JSON.stringify(order));
  }

  public getAllUsers(): AppUser[] {
    return JSON.parse(localStorage.getItem('users') as string);
  }

  public getCart(): Cart[] {
   return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}