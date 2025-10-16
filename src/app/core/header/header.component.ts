import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../shared/cart.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatSidenav, MatSidenavContainer, MatSidenavModule, MatButtonModule, MatBadgeModule, MatMenuModule, MatIconModule,RouterModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 

})
export class HeaderComponent {
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartCount.subscribe(count => this.cartCount = count);
  }

}
