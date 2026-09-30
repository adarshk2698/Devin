import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  loading = true;
  orderPlaced = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      // Shipping Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      country: ['United States', Validators.required],
      
      // Payment Information
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', [Validators.required, Validators.minLength(2)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      
      // Additional Options
      saveInfo: [false],
      terms: [false, Validators.requiredTrue]
    });

    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.getCartTotal();
  }

  ngOnInit(): void {
    this.cartItems$.subscribe(items => {
      this.loading = false;
      if (items.length === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      // Simulate order processing
      this.orderPlaced = true;
      this.cartService.clearCart();
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        this.router.navigate(['']);
      }, 3000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.checkoutForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'phone') {
        return 'Please enter a valid 10-digit phone number';
      }
      if (controlName === 'zipCode') {
        return 'Please enter a valid 5-digit zip code';
      }
      if (controlName === 'cardNumber') {
        return 'Please enter a valid 16-digit card number';
      }
      if (controlName === 'expiryDate') {
        return 'Please use MM/YY format';
      }
      if (controlName === 'cvv') {
        return 'Please enter a valid CVV';
      }
    }
    if (control?.hasError('requiredTrue')) {
      return 'You must accept the terms and conditions';
    }
    return '';
  }

  calculateTotal(): number {
    const total = this.cartService.getCartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = total > 50 ? 0 : 5;
    const tax = total * 0.08;
    return total + shipping + tax;
  }

  calculateShipping(): number {
    const total = this.cartService.getCartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return total > 50 ? 0 : 5;
  }

  calculateTax(): number {
    const total = this.cartService.getCartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return total * 0.08;
  }

  calculateSubtotal(): number {
    return this.cartService.getCartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
}
