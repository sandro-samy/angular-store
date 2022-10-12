import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IsInStockPipe } from './pipe/is-in-stock.pipe';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/productCard.component';
import { ErrorComponent } from './error/error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IsInStockPipe,
    ProductsComponent,
    ProductCardComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    CartComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
