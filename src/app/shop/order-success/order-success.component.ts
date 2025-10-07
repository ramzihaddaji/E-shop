import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {
  name = '';
  total = 0;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as any;
    this.name = state?.name || 'Client';
    this.total = state?.total || 0;
  }



goShop() {
  this.router.navigate(['/shop']);
}
}
