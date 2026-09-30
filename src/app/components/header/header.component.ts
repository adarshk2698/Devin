import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDarkMode$: Observable<boolean>;
  cartItemCount$: Observable<number>;
  isDarkMode: boolean = false;

  constructor(
    private themeService: ThemeService,
    private cartService: CartService,
    private router: Router
  ) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.cartItemCount$ = this.cartService.getCartItemCount();
    
    this.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  ngOnInit(): void {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
}
