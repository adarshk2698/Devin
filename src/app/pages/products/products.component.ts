import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<string[]>;
  selectedCategory: string = '';
  searchQuery: string = '';
  loading = true;

  constructor(
    public productService: ProductService,
    private cartService: CartService
  ) {
    this.products$ = this.productService.getProducts();
    this.categories$ = this.productService.getCategories();
  }

  ngOnInit(): void {
    this.products$.subscribe(() => {
      this.loading = false;
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category) {
      this.products$ = this.productService.getProductsByCategory(category);
    } else {
      this.products$ = this.productService.getProducts();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.products$ = this.productService.searchProducts(this.searchQuery);
    } else {
      this.products$ = this.productService.getProducts();
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
