import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagementComponent } from './product-management/product-management.component';

// Modules Angular Material optionnels
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardComponent,          // ✅ import du composant standalone
    ProductManagementComponent,  // ✅ import du composant standalone
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AdminModule { }
