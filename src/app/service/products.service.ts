import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { StarsService } from './stars.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  private products: Observable<Product[]> = new BehaviorSubject<Product[]>(
    [] as Product[]
  );
  constructor(private http: HttpClient, private starsService: StarsService) {
    this.products = this.http
      .get<Product[]>(
        'https://60523dc8fb49dc00175b7d04.mockapi.io/api/v1/products'
      )
      .pipe(
        map((res: Product[]) => {
          return res.map((product: Product) => {
            product['starIcons'] = this.starsService.star(product.rate);
            return product;
          });
        })
      );
  }

  ngOnInit(): void {}
  get allProducts() {
    return this.products;
  }
}
