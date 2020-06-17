import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authenticated = true;

  public get isAuthenticated(): boolean {
    return this.authenticated;
  }

  public set isAuthenticated(value: boolean) {
    this.authenticated = value;
  }
}
