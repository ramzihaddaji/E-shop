import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Erreur lors du chargement des produits', err)
    });
  }
}
