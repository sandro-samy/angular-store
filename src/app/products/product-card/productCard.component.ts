import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}
  changeRouteTo(id: string): void {
    this.router.navigate(['/product', id]);
  }
}
