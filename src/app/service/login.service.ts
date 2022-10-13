import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem('loggedIn')!) || false
  );
  constructor() {}
  login(): void {
    this.loggedIn.next(true);
    localStorage.setItem('loggedIn', 'true');
  }
  logout(): void {
    this.loggedIn.next(false);
    localStorage.setItem('loggedIn', 'false');
  }
  get isloggedIn() {
    return this.loggedIn.asObservable();
  }
}
