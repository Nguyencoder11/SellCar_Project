import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // luu tru token
  static saveToken(token: string):void {
    window.localStorage.removeItem(TOKEN)
    window.localStorage.setItem(TOKEN, token)
  }

  // luu tru thong tin user
  static saveUser(user: any):void {
    window.localStorage.removeItem(USER)
    window.localStorage.setItem(USER, JSON.stringify(user))
  }

  static getUserId(): string {
    const user = this.getUser()
    if (user == null) {return ''}
    return user.id
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN)
  }

  static getUser() {
    const user = localStorage.getItem(USER)
    return user ? JSON.parse(user) : null
  }

  static getUserRole():string {
    const user = this.getUser()
    if (user == null) return ""
    return user.role
  }

  static isAdminLoggedIn():boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }

  static isCustomerLoggedIn():boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == "CUSTOMER";
  }

  static logout() {
    window.localStorage.removeItem(TOKEN)
    window.localStorage.removeItem(USER)
  }
}
