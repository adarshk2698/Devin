import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItems.next(currentItems);
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value.filter(item => item.product.id !== productId);
    this.cartItems.next(currentItems);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    });
    this.cartItems.next(currentItems);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveCart();
  }

  getCartTotal(): Observable<number> {
    return new Observable(subscriber => {
      this.cartItems$.subscribe(items => {
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        subscriber.next(total);
      });
    });
  }

  getCartItemCount(): Observable<number> {
    return new Observable(subscriber => {
      this.cartItems$.subscribe(items => {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        subscriber.next(count);
      });
    });
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }
}
