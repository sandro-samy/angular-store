import { Component, OnInit } from '@angular/core';
import { CartItem } from '../interfaces/product';
import { CartService } from '../service/cart.service';
import { faArrowLeftLong, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

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
  faMinus = faMinus;
  faPlus = faPlus;
  faTrash = faTrashAlt;
  faArrowLeftLong = faArrowLeftLong;

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
  decrease(product: CartItem) {
    this.cartService.decreament(product);
  }
  increase(product: CartItem) {
    this.cartService.increament(product);
  }
  remove(productToRemove: CartItem) {
    this.cartService.removeFromCart({ ...productToRemove });
  }
}
