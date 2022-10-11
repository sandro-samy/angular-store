import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

interface Item extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsInCart: Item[] = [];
  private TotalPrice: number = 0;
  private itemsCount: number = 0;

  increament(productToAdd: Product) {
    const matchingItem = this.itemsInCart.find(
      (product) => product.id === productToAdd.id
    );
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.itemsInCart.push({
        ...productToAdd,
        quantity: 1,
      });
    }
    this.updateCount();
    this.updateTotal();
  }
  decreament(cartItem: Item) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      this.removeFromCart(cartItem);
    }
    this.updateCount();
    this.updateTotal();
  }

  removeFromCart(cartItem: Item) {
    const index = this.itemsInCart.indexOf(cartItem);
    if (index > -1) {
      this.itemsInCart.splice(index, 1);
    }
    this.updateCount();
    this.updateTotal();
  }

  getCartItem(id: string) {
    return this.itemsInCart.find((p) => p.id === id);
  }

  updateTotal() {
    this.TotalPrice = this.itemsInCart.reduce(
      (acc, curr) => (acc += parseInt(curr.price) * curr.quantity),
      0
    );
  }
  updateCount() {
    this.itemsCount = this.itemsInCart.reduce(
      (acc, item: Item) => (acc += item.quantity),
      0
    );
  }
  get Total() {
    return this.TotalPrice;
  }
  get count() {
    return this.itemsCount;
  }

  constructor() {}
}
