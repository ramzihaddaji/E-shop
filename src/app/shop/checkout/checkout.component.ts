import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderService } from '../../shared/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total = 0;

  user = { name: '', email: '', address: '', city: '', postalCode: '' };

  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  confirmOrder() {
    if (!this.user.name || !this.user.email || !this.user.address) {
      this.snackBar.open('Veuillez remplir tous les champs requis ⚠️', 'Fermer', { duration: 3000 });
      return;
    }

    const order = {
      customerName: this.user.name,
      customerEmail: this.user.email,
      shippingAddress: `${this.user.address}, ${this.user.city}, ${this.user.postalCode}`,
      items: this.cartItems.map(i => ({
        productId: i.id,
        productName: i.name,
        price: i.price,
        quantity: i.quantity
      }))
    };

    this.orderService.createOrder(order).subscribe({
      next: (res) => {
        this.cartService.clearCart();
        this.router.navigate(['/order-success'], { state: { name: res.customerName, total: res.total } });
      },
      error: (err) => {
        this.snackBar.open('Erreur lors de la commande ❌', 'Fermer', { duration: 3000 });
        console.error(err);
      }
    });
  }
}
