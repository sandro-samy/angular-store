import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem, Product } from '../interfaces/product';
import { StarsService } from './stars.service';
import { ProductsService } from './products.service';

// ****************************************************************************************** //
//------ Total and Count are exist for any future need of them to beening centeralized. ------//
// ****************************************************************************************** //

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
    let curr = this.currData || [];
    const itemInArray = curr.find((item: CartItem) => item.id === product.id);
    if (itemInArray === undefined) {
      this.updateItems([
        ...this.itemsInCart.value,
        { ...product, quantity: 1 },
      ]);
    }

    this.router.navigateByUrl('/cart');
  }

  increament(productToAdd: Product) {
    let curr = this.currData;
    const matchingItem = curr.find(
      (item: CartItem) => item.id === productToAdd.id
    );
    if (matchingItem) {
      if (matchingItem.quantity < matchingItem.count) {
        matchingItem.quantity += 1;
        this.updateItems([...this.itemsInCart.value]);
      }
    } else {
      this.updateItems([
        ...this.itemsInCart.value,
        { ...productToAdd, quantity: 1 },
      ]);
    }
  }

  decreament(productToReduce: CartItem) {
    let curr = this.currData;
    const matchingItem = curr.find(
      (product: CartItem) => product.id === productToReduce.id
    );
    if (productToReduce.quantity > 1) {
      if (matchingItem) {
        matchingItem.quantity -= 1;
        this.updateItems([...this.itemsInCart.value]);
      }
    } else {
      if (matchingItem) {
        this.removeFromCart({ ...matchingItem });
      }
    }
  }

  removeFromCart(cartItem: CartItem) {
    const newCartItems = this.itemsInCart.value.filter(
      (item) => !(item.name === cartItem.name)
    );
    this.updateItems(newCartItems);
  }

  // updating items notify subcribers and localStorage
  // updating total and items count notify subcribers and localStorage
  updateItems(items: CartItem[]): void {
    this.itemsInCart.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
    this.updateTotal();
    this.updateCount();
  }

  // updating total price notify subcribers and localStorage
  updateTotal(): void {
    let newData: CartItem[] = JSON.parse(localStorage.getItem('cart')!) || [];
    let newTotal = newData.length
      ? newData.reduce(
          (acc, curr) => (acc += parseInt(curr.price) * curr.quantity),
          0
        )
      : 0;
    this.TotalPrice.next(newTotal);
    localStorage.setItem('cartTotalPrice', JSON.stringify(newTotal));
  }

  // updating items count notify subcribers and localStorage
  updateCount(): void {
    let newData: CartItem[] = JSON.parse(localStorage.getItem('cart')!) || [];
    let newCount = newData.length
      ? newData.reduce((acc, curr) => (acc += curr.quantity), 0)
      : 0;
    this.itemsCount.next(newCount);
    localStorage.setItem('cardCount', JSON.stringify(newCount));
  }

  // getters to access private variables from components as observable
  getCartItem(id: string) {
    return this.itemsInCart.value.find((p) => p.id === id);
  }
  get currData(): CartItem[] {
    let curr = JSON.parse(localStorage.getItem('cart')!) || [];
    this.items.subscribe((data): void => {
      curr = data;
    });
    return curr;
  }
  get items(): Observable<CartItem[]> {
    return this.itemsInCart.asObservable();
  }
  get total(): Observable<number> {
    return this.TotalPrice.asObservable();
  }
  get count(): Observable<number> {
    return this.itemsCount.asObservable();
  }

  // sync local data (state and/or localStorage) with server data
  // checking and updating stored data in cart
  updateData() {
    if (this.itemsInCart.value.length > 0) {
      this.productsService.allProducts.subscribe((updatedData: Product[]) => {
        let curr = this.currData;
        const afterChange = curr.reduce((acc: CartItem[], item: CartItem) => {
          const updatedItem = updatedData.find(
            (newItem: Product) => newItem.id === item.id
          );
          if (updatedItem) {
            let quantity = item.quantity;
            if (updatedItem.count < item.quantity) {
              quantity = updatedItem.count;
            }
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
            item.quantity = quantity;
            item.count = count;
            item.description = description;
            item.image = image;
            item.name = name;
            item.price = price;
            item.rate = rate;
            item.reviews = reviews;
            item.starIcons = starIcons;
            item.createdAt = createdAt;
            acc.push(item);
          } else {
            this.removeFromCart(item);
          }
          return acc;
        }, []);
        this.updateItems([...afterChange]);
      });
    }
  }
}
