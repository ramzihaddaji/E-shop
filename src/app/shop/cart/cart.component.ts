import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CartService } from '../../shared/cart.service';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatSnackBarModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(item: CartItem, event: any) {
    const newQuantity = +event.target.value;
    this.cartService.updateQuantity(item.id, newQuantity);
    this.cartItems = this.cartService.getCartItems();

    this.snackBar.open(`Quantité mise à jour pour ${item.name} ✅`, 'Fermer', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

  removeItem(itemId: number) {
    const item = this.cartItems.find(i => i.id === itemId);
    this.cartService.removeFromCart(itemId);
    this.cartItems = this.cartService.getCartItems();

    this.snackBar.open(`${item?.name} supprimé du panier ❌`, 'Fermer', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-warn']
    });
  }

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

 checkout() {
  // Snackbar moderne pour info
  this.snackBar.open('Redirection vers la page de paiement (à venir) 💳', 'Fermer', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['info-snackbar']
  });

  // Redirection
  this.router.navigate(['/checkout']);
}
}
