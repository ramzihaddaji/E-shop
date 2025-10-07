import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(item: CartItem, event: any) {
    const newQuantity = +event.target.value;
    this.cartService.updateQuantity(item.id, newQuantity);
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.cartItems = this.cartService.getCartItems();
  }

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    alert('Redirection vers la page de paiement (à venir)');
    this.router.navigate(['/checkout']);
  }
}
