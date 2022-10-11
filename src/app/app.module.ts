import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IsInStockPipe } from './pipe/is-in-stock.pipe';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/productCard.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarsPipe } from './pipe/stars.pipe';

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
    StarsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}