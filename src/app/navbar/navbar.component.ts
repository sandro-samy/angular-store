import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { CartService } from '../service/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faCartShopping = faCartShopping;
  count: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.count.subscribe((count) => (this.count = count));
  }
}
