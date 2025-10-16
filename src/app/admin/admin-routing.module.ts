import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'products', component: ProductManagementComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
