import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products: Product[] = [
    { name: 'Robe Fleurie', price: 59, quantity: 12 },
    { name: 'Jean Slim', price: 79, quantity: 5 },
    { name: 'T-Shirt Blanc', price: 29, quantity: 20 },
  ];

  displayedColumns: string[] = ['name', 'price', 'quantity'];
}
