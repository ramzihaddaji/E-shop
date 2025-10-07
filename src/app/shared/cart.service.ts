import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: any[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0); // ✅ compteur interne
  cartCount = this.cartCountSubject.asObservable(); // ✅ observable pour le header

  addToCart(product: any) {
    const item = this.cart.find(i => i.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.updateCartCount();
  }

  getCartItems() {
    return this.cart;
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCartCount();
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.updateCartCount();
  }

  clearCart() {
    this.cart = [];
    this.updateCartCount();
  }

  private updateCartCount() {
    const total = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(total);
  }
}
