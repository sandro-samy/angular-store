import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './modules/shared/error/error.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './modules/login/login.component';
import { ProductComponent } from './modules/shared/product/product.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './modules/register/register.component';
import { SaveChangesGuard } from './guard/save-changes.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
  { path: 'product', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [SaveChangesGuard],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
