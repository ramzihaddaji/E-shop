import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

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
    MatFormFieldModule, // <-- ajouté
    MatInputModule      // <-- ajouté
  ],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  products: Product[] = [
    { id: 1, name: 'Robe Fleurie', price: 59, quantity: 12, image: 'assets/images/images.jpg' },
    { id: 2, name: 'Jean Slim', price: 79, quantity: 5, image: 'assets/images/images.jpg' },
    { id: 3, name: 'T-Shirt Blanc', price: 29, quantity: 20, image: 'assets/images/images.jpg' }
  ];

  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'actions'];
  productForm: FormGroup;
  editingProduct: Product | null = null;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      image: ['', Validators.required]
    });
  }

  addOrUpdateProduct() {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;

    if (this.editingProduct) {
      const index = this.products.findIndex(p => p.id === this.editingProduct!.id);
      this.products[index] = { ...this.editingProduct, ...productData };
      this.snackBar.open('Produit mis à jour !', 'OK', { duration: 3000, panelClass: ['success-snackbar'] });
      this.editingProduct = null;
    } else {
      const newProduct: Product = { id: Date.now(), ...productData };
      this.products.push(newProduct);
      this.snackBar.open('Produit ajouté !', 'OK', { duration: 3000, panelClass: ['success-snackbar'] });
    }

    this.productForm.reset({ name: '', price: 0, quantity: 0, image: '' });
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.productForm.setValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image
    });
  }

  deleteProduct(product: Product) {
    if (confirm(`Voulez-vous vraiment supprimer ${product.name} ?`)) {
      this.products = this.products.filter(p => p.id !== product.id);
      this.snackBar.open('Produit supprimé !', 'OK', { duration: 3000, panelClass: ['success-snackbar'] });
    }
  }
}
