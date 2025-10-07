import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
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
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
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
  currentSlide = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.autoSlide();
  }

  // Slider automatique toutes les 3 secondes
  autoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.featuredProducts.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.featuredProducts.length) % this.featuredProducts.length;
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    if (this.selectedCategory === 'Tous') return this.products;
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} ajouté au panier`);
  }
}
