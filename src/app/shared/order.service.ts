import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
}

export interface OrderResponse {   // ✅ doit être exporté
  id: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'http://localhost:8082/api/orders';

  constructor(private http: HttpClient) {}

  // Créer une commande
  createOrder(order: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.baseUrl, order);
  }

  // 🔹 Récupérer toutes les commandes (pour admin)
  getAllOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.baseUrl);
  }

  // 🔹 Changer le statut d'une commande
  changeStatus(orderId: number, status: 'ACCEPTED' | 'REJECTED'): Observable<OrderResponse> {
    return this.http.patch<OrderResponse>(`${this.baseUrl}/${orderId}/status?status=${status}`, {});
  }
}

