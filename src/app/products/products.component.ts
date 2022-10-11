import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { store } from '../store/store';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private http: HttpClient, private route: Router) {}
  ngOnInit(): void {
    this.http
      .get<Product[]>(
        'https://60523dc8fb49dc00175b7d04.mockapi.io/api/v1/products'
      )
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }
}
