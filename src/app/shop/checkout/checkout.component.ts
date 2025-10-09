import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];
  total = 0;

  user = {
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  };

  constructor(private cartService: CartService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  confirmOrder() {
    if (!this.user.name || !this.user.email || !this.user.address) {
      // Snackbar moderne pour erreur
      this.snackBar.open('Veuillez remplir tous les champs requis ⚠️', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Snackbar moderne pour succès
    this.snackBar.open(`Merci ${this.user.name} ! Votre commande a été passée 🎉`, 'Fermer', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });

    this.cartService.clearCart();
    this.router.navigate(['/shop']);
  }
}
