import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderResponse, OrderService } from '../../../shared/order.service';



@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, MatSnackBarModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: OrderResponse[] = [];
  displayedColumns: string[] = ['id', 'customerName', 'total', 'createdAt', 'status', 'actions'];

  constructor(private orderService: OrderService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Erreur chargement commandes :', err)
    });
  }

  acceptOrder(orderId: number): void {
    this.changeStatus(orderId, 'ACCEPTED');
  }

  rejectOrder(orderId: number): void {
    this.changeStatus(orderId, 'REJECTED');
  }

  private changeStatus(orderId: number, status: 'ACCEPTED' | 'REJECTED'): void {
    this.orderService.changeStatus(orderId, status).subscribe({
      next: (updated) => {
        this.snackBar.open(`Commande ${status.toLowerCase()} !`, 'OK', { duration: 3000 });
        this.loadOrders(); // refresh table
      },
      error: (err) => {
        console.error('Erreur changement statut :', err);
        this.snackBar.open('Erreur lors du changement de statut', 'OK', { duration: 3000 });
      }
    });
  }
}
