import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../interfaces/product';
import { LoaderService } from '../service/loader.service';
import { ProductsService } from '../service/products.service';
import { StarsService } from '../service/stars.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  constructor(
    private http: HttpClient,
    private starsService: StarsService,
    private productsService: ProductsService,
    private loaderService: LoaderService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.productsService.allProducts.subscribe(
      (data) => (this.products = data)
    );

    this.loaderService.getLoaderStatus.subscribe((data) => {
      this.loading = data;
      this.loading ? this.ngxSpinnerService.show() : this.ngxSpinnerService.hide();
    });
  }
}
