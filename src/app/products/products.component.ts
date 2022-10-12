import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductsService } from '../service/products.service';
import { StarsService } from '../service/stars.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private http: HttpClient,
    private starsService: StarsService,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.productsService.allProducts.subscribe(
      (data) => (this.products = data)
    );
  }
}
