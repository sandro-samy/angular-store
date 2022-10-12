import { Component, OnInit } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { CartService } from './service/cart.service';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lab2';
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.updateData();
  }
}
