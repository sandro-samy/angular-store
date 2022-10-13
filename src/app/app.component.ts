import { Component, OnInit } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { CartService } from './service/cart.service';
import { LoaderService } from './service/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'lab2';
  loading: boolean = false;
  constructor(
    private cartService: CartService,
    private loaderService: LoaderService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.cartService.updateData();
    this.loaderService.getLoaderStatus.subscribe((res) => {
      this.loading = res;
      this.loading
        ? this.ngxSpinnerService.show()
        : this.ngxSpinnerService.hide();
      
    });
  }
}
