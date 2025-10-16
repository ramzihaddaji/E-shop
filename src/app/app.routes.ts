import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { CatalogueComponent } from './shop/catalogue/catalogue.component';
import { CartComponent } from './shop/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { OrderSuccessComponent } from './shop/order-success/order-success.component';

export const routes: Routes = [
    {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'shop', pathMatch: 'full' },
      { path: 'shop', component: CatalogueComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin', component: DashboardComponent },
      {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
    ]
  }
];
