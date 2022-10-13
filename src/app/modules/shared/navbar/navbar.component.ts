import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { CartService } from '../../../service/cart.service';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faCartShopping = faCartShopping;
  logoutIcon = faArrowRightFromBracket;
  count: number = 0;
  isLoggedIn: boolean = false;
  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.count.subscribe((count) => (this.count = count));
    this.loginService.isloggedIn.subscribe((data) => (this.isLoggedIn = data));
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
