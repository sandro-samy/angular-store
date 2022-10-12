import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem, Product } from '../interfaces/product';
import { StarsService } from './stars.service';
import { ProductsService } from './products.service';
//------ Total and Count are exist for any future need of them to beening centeralized. ------//
@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  // declaration of private variables
  // checking localStorage variables and put them as state
  private itemsInCart: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >(JSON.parse(localStorage.getItem('cart')!) || []);
  private TotalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(
    JSON.parse(localStorage.getItem('cartTotalPrice')!) || 0
  );
  private itemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(
    JSON.parse(localStorage.getItem('cardCount')!) || 0
  );

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {}
  addToCart(product: Product) {
    this.items.subscribe((data): void => {
      const itemInArray = data.find((item) => item.id === product.id);
      if (itemInArray === undefined) {
        this.updateItems([
          ...this.itemsInCart.value,
          { ...product, quantity: 1 },
        ]);
      }
    });
    this.router.navigateByUrl('/cart');
  }

  increament(productToAdd: Product) {
    this.items.subscribe((data): void => {
      const matchingItem = data.find((item) => item.id === productToAdd.id);
      if (matchingItem) {
        matchingItem.quantity += 1;
        this.updateItems([...this.itemsInCart.value]);
      } else {
        this.updateItems([
          ...this.itemsInCart.value,
          { ...productToAdd, quantity: 1 },
        ]);
      }
    });
  }

  decreament(productToReduce: CartItem) {
    if (productToReduce.quantity > 1) {
      const matchingItem = this.itemsInCart.value.find(
        (product) => product.id === productToReduce.id
      );
      if (matchingItem) {
        matchingItem.quantity -= 1;
        this.updateItems([...this.itemsInCart.value]);
      }
    } else {
      this.removeFromCart(productToReduce);
    }
  }

  removeFromCart(cartItem: CartItem) {
    const index = this.itemsInCart.value.indexOf(cartItem);
    if (index > -1) {
      this.updateItems([...this.itemsInCart.value.slice(0, index)]);
    }
  }

  // get certain item from cart list
  getCartItem(id: string) {
    return this.itemsInCart.value.find((p) => p.id === id);
  }

  // updating items notify subcribers and localStorage
  // updating total and items count notify subcribers and localStorage
  updateItems(items: CartItem[]): void {
    this.itemsInCart.next(items);
    let itemsData: CartItem[] = [];
    this.items.subscribe((x) => (itemsData = x));
    localStorage.setItem('cart', JSON.stringify(itemsData));
    this.updateCount();
    this.updateTotal();
  }
  // updating total price notify subcribers and localStorage
  updateTotal(): void {
    let newTotal = this.itemsInCart.value.reduce(
      (acc, curr) => (acc += parseInt(curr.price) * curr.quantity),
      0
    );
    this.TotalPrice.next(newTotal);
    localStorage.setItem('cartTotalPrice', JSON.stringify(newTotal));
  }
  // updating items count notify subcribers and localStorage
  updateCount(): void {
    let newCount = this.itemsInCart.value.reduce(
      (acc, item: CartItem) => (acc += item.quantity),
      0
    );
    this.itemsCount.next(newCount);
    localStorage.setItem('cardCount', JSON.stringify(newCount));
  }

  // getters to access private variables from components as observable
  get items(): Observable<CartItem[]> {
    return this.itemsInCart.asObservable();
  }
  get total(): Observable<number> {
    return this.TotalPrice.asObservable();
  }
  get count(): Observable<number> {
    return this.itemsCount.asObservable();
  }
  updateData() {
    // sync local data (state and/or localStorage) with server data
    // checking and updating stored data in cart
    if (this.itemsInCart.value.length > 0) {
      this.productsService.allProducts.subscribe((updatedData: Product[]) => {
        this.itemsInCart.value.map((item: CartItem) => {
          if (item.quantity >= 0) {
            this.itemsInCart.value.find((existingItem: CartItem) => {
              const updatedItem = updatedData.find(
                (newItem: Product) => newItem.id === existingItem.id
              );
              if (updatedItem) {
                if (updatedItem.count < existingItem.quantity) {
                  let quantity = 0;
                  quantity = updatedItem.count;
                  const {
                    createdAt,
                    name,
                    description,
                    price,
                    image,
                    id,
                    starIcons,
                    reviews,
                    rate,
                    count,
                  } = updatedItem;
                  existingItem.quantity = quantity;
                  existingItem.count = count;
                  existingItem.description = description;
                  existingItem.image = image;
                  existingItem.name = name;
                  existingItem.price = price;
                  existingItem.rate = rate;
                  existingItem.reviews = reviews;
                  existingItem.starIcons = starIcons;
                  existingItem.createdAt = createdAt;
                }
              } else {
                this.removeFromCart(existingItem);
              }
            });
          }
        });
        this.updateItems([...this.itemsInCart.value]);
      });
    }
  }
}
