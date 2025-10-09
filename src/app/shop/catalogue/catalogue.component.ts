import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../shared/cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit, OnDestroy {
  categories = ['Tous', 'Robes', 'Jeans', 'T-Shirts'];
  selectedCategory = 'Tous';

  products: Product[] = [
    { id: 1, name: 'Robe Fleurie', price: 59, image: 'assets/images/images.jpg', category: 'Robes' },
    { id: 2, name: 'Jean Slim', price: 79, image: 'assets/images/images.jpg', category: 'Jeans' },
    { id: 3, name: 'T-Shirt Blanc', price: 29, image: 'assets/images/images.jpg', category: 'T-Shirts' },
    { id: 4, name: 'Robe Été', price: 69, image: 'assets/images/images.jpg', category: 'Robes' },
    { id: 5, name: 'Jean Déchiré', price: 89, image: 'assets/images/images.jpg', category: 'Jeans' },
  ];

  featuredProducts = this.products.slice(0, 3);
  currentAngle = 0;
  autoRotate: any;
  radius = 300;

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoRotate);
  }

  startAutoRotate() {
    this.autoRotate = setInterval(() => {
      this.rotate(1);
    }, 4000);
  }

  pauseRotate() {
    clearInterval(this.autoRotate);
  }

  rotate(direction: number) {
    this.currentAngle = (this.currentAngle + direction * (360 / this.featuredProducts.length)) % 360;
  }

  getCarouselTransform() {
    return `translateZ(-${this.radius}px) rotateY(-${this.currentAngle}deg)`;
  }

  getSlideTransform(index: number) {
    const angle = (360 / this.featuredProducts.length) * index;
    return `rotateY(${angle}deg) translateZ(${this.radius}px)`;
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    if (this.selectedCategory === 'Tous') return this.products;
    return this.products.filter((p) => p.category === this.selectedCategory);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);

    // Snackbar moderne avec animation
    this.snackBar.open(`${product.name} ajouté au panier ✅`, 'Fermer', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
    });
  }
}
