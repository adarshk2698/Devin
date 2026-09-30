import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 299.99,
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      category: 'Electronics',
      stock: 50,
      rating: 4.5,
      featured: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking, GPS, and water resistance.',
      price: 399.99,
      image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
      category: 'Electronics',
      stock: 30,
      rating: 4.8,
      featured: true
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      description: 'Durable laptop backpack with multiple compartments and USB charging port.',
      price: 79.99,
      image: 'https://via.placeholder.com/300x300?text=Backpack',
      category: 'Accessories',
      stock: 100,
      rating: 4.3
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with Cherry MX switches and programmable keys.',
      price: 149.99,
      image: 'https://via.placeholder.com/300x300?text=Keyboard',
      category: 'Electronics',
      stock: 45,
      rating: 4.7,
      featured: true
    },
    {
      id: 5,
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
      price: 49.99,
      image: 'https://via.placeholder.com/300x300?text=Mouse',
      category: 'Electronics',
      stock: 75,
      rating: 4.4
    },
    {
      id: 6,
      name: 'Phone Case',
      description: 'Protective phone case with shock absorption and stylish design.',
      price: 24.99,
      image: 'https://via.placeholder.com/300x300?text=Phone+Case',
      category: 'Accessories',
      stock: 200,
      rating: 4.2
    },
    {
      id: 7,
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
      price: 59.99,
      image: 'https://via.placeholder.com/300x300?text=USB+Hub',
      category: 'Electronics',
      stock: 60,
      rating: 4.6
    },
    {
      id: 8,
      name: 'Screen Protector',
      description: 'Tempered glass screen protector with anti-fingerprint coating.',
      price: 19.99,
      image: 'https://via.placeholder.com/300x300?text=Screen+Protector',
      category: 'Accessories',
      stock: 150,
      rating: 4.1
    }
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.featured));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(p => p.category === category));
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return of(this.products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery)
    ));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(p => p.category))];
    return of(categories);
  }
}
