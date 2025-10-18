import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['image', 'name', 'price', 'stock', 'actions'];
  productForm: FormGroup;
  editingProduct: Product | null = null;
  featuredProducts: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      imageUrl: ['assets/images/images.jpg', Validators.required],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  // 🔹 Charger tous les produits
  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data.map((product: any) => ({
          ...product,
          imageUrl: product.imageUrl || 'assets/images/images.jpg'
        }));
        this.featuredProducts = this.products.slice(0, 3);
      },
      error: (err) => console.error('Erreur chargement produits:', err),
    });
  }

  // 🔹 Ajouter ou mettre à jour un produit
  addOrUpdateProduct(): void {
    if (this.productForm.invalid) return;

    const productData: Product = {
      ...this.productForm.value,
      imageUrl: this.productForm.value.imageUrl || 'assets/images/images.jpg'
    };

    if (this.editingProduct) {
      const updatedProduct: Product = { ...this.editingProduct, ...productData };
      this.productService.update(updatedProduct.id!, updatedProduct).subscribe({
        next: () => {
          this.snackBar.open('Produit mis à jour !', 'OK', { duration: 3000 });
          this.editingProduct = null;
          this.loadProducts();
          this.productForm.reset({ imageUrl: 'assets/images/images.jpg', stock: 0 });
        },
        error: (err) => console.error('Erreur update:', err)
      });
    } else {
      this.productService.create(productData).subscribe({
        next: () => {
          this.snackBar.open('Produit ajouté !', 'OK', { duration: 3000 });
          this.loadProducts();
          this.productForm.reset({ imageUrl: 'assets/images/images.jpg', stock: 0 });
        },
        error: (err) => console.error('Erreur ajout:', err)
      });
    }
  }

  // 🔹 Préparer un produit pour édition
  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.setValue({
      name: product.name,
      price: product.price,
      stock: product.stock,
      imageUrl: product.image || 'assets/images/images.jpg',
      category: product.category || ''
    });
  }

  // 🔹 Supprimer un produit
  deleteProduct(product: Product): void {
    if (confirm(`Voulez-vous vraiment supprimer ${product.name} ?`)) {
      this.productService.delete(product.id!).subscribe({
        next: () => {
          this.snackBar.open('Produit supprimé !', 'OK', { duration: 3000 });
          this.loadProducts();
        },
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}
