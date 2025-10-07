import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { Router } from '@angular/router';


import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
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

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  confirmOrder() {
    if (!this.user.name || !this.user.email || !this.user.address) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    alert(`Merci ${this.user.name} ! Votre commande a été passée avec succès 🎉`);
    this.cartService.clearCart();
    this.router.navigate(['/shop']);
  }
}
