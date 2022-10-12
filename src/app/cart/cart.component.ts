import { Component, OnInit } from '@angular/core';
import { CartItem } from '../interfaces/product';
import { CartService } from '../service/cart.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  totalPrice: number = 0;
  count: number = 0;

  shoppingCart = faShoppingCart;

  constructor(private cartService: CartService) {
    console.log(this.items);
  }

  ngOnInit(): void {
    this.cartService.items.subscribe((data) => {
      this.items = data;
    });
    this.cartService.total.subscribe((data) => (this.totalPrice = data));
    this.cartService.count.subscribe((data) => (this.count = data));
  }
}
