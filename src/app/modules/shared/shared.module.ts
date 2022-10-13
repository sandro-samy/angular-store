import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { IsInStockPipe } from 'src/app/pipe/is-in-stock.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    ProductComponent,
    ErrorComponent,
    IsInStockPipe,
  ],

  imports: [CommonModule, FormsModule, FontAwesomeModule, AppRoutingModule],
  exports: [IsInStockPipe, NavbarComponent, ProductComponent, ErrorComponent],
})
export class SharedModule {}
