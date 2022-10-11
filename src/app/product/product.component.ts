import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStart } from '@fortawesome/free-regular-svg-icons';
import { concat, concatMap, map } from 'rxjs';
import { Product } from '../interfaces/product';
import { StarsService } from '../service/stars.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  faStar = faStar;
  faStarHalf = faStarHalf;
  faEmptyStar = emptyStart;
  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private starsService: StarsService
  ) {}
  product: Product = {
    image: '',
    name: '',
    description: '',
    price: '0',
    id: '0',
    createdAt: '',
    rate: 0,
    count: 0,
    reviews: [],
  };
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.http
      .get<Product>(
        `https://60523dc8fb49dc00175b7d04.mockapi.io/api/v1/products/${id}`
      )
      .pipe(
        map((res: Product) => {
          res['starIcons'] = this.starsService.star(res.rate);
          return res['starIcons'];
        })
      )
      .subscribe((product: Product): void => {
        this.product = product;
        console.log(this.product);
      });
  }
  getStars(rate: number): string[] {
    return this.starsService.star(rate);
  }
}
