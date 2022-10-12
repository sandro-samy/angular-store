import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './productCard.component.html',
  styleUrls: ['./productCard.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {
    createdAt: '',
    name: '',
    image: '',
    rate: 0,
    count: 0,
    description: '',
    price: '',
    reviews: [''],
    id: '',
  };

  constructor(private router: Router, private cart: CartService) {}

  ngOnInit(): void {}
  changeRouteTo(id: string): void {
    this.router.navigate(['/product', id]);
  }
  addToCart() {
    this.product.count > 0 && this.cart.addToCart(this.product);
  }
}
