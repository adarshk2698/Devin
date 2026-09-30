# Angular E-Commerce Application

A comprehensive e-commerce application built with Angular 17 featuring dark/light theme support, product management, shopping cart functionality, and a complete checkout process.

## Features

### Core Angular Concepts Implemented
- **Components**: Multiple reusable components (Header, Footer, ProductCard, Cart)
- **Services**: Injectable services for state management (ProductService, CartService, ThemeService)
- **Routing**: Angular Router for navigation between pages
- **Pipes**: Custom pipes for data transformation (PriceFormatPipe, SearchFilterPipe)
- **Directives**: Custom directive for DOM manipulation (ProductHighlightDirective)
- **Forms**: Reactive forms with validation for checkout process
- **Observables**: RxJS for reactive data streams
- **Dependency Injection**: Angular's DI system for service injection
- **Modules**: Feature modules and app module organization
- **Interfaces**: TypeScript interfaces for type safety

### Application Features
- **Dark/Light Theme**: Toggle between dark and light modes with persistent storage
- **Product Catalog**: Browse products with category filtering and search
- **Product Details**: Detailed product view with ratings and stock information
- **Shopping Cart**: Add/remove items, quantity management, price calculations
- **Checkout Process**: Complete checkout with shipping and payment forms
- **Responsive Design**: Mobile-friendly layout
- **State Management**: Cart state persisted in localStorage

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── header/
│   │   ├── footer/
│   │   ├── product-card/
│   │   └── cart/
│   ├── pages/               # Page components
│   │   ├── home/
│   │   ├── products/
│   │   ├── product-details/
│   │   ├── cart-page/
│   │   └── checkout/
│   ├── services/            # Injectable services
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   └── theme.service.ts
│   ├── models/              # TypeScript interfaces
│   │   ├── product.model.ts
│   │   └── cart-item.model.ts
│   ├── pipes/               # Custom pipes
│   │   ├── price-format.pipe.ts
│   │   └── search-filter.pipe.ts
│   ├── directives/          # Custom directives
│   │   └── product-highlight.directive.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
├── index.html
├── main.ts
└── styles.css
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Angular CLI globally (if not already installed):
```bash
npm install -g @angular/cli
```

## Running the Application

Start the development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200/`

## Building for Production

Create a production build:
```bash
ng build
```

The output will be in the `dist/` directory.

## Usage

### Navigation
- **Home**: Featured products and company information
- **Products**: Full product catalog with search and filtering
- **Product Details**: Individual product information
- **Cart**: Shopping cart management
- **Checkout**: Complete order process

### Theme Toggle
Click the sun/moon icon in the header to switch between dark and light themes. Theme preference is saved in localStorage.

### Shopping Cart
- Add products to cart from product cards or details page
- Adjust quantities in the cart
- Remove items from cart
- View order summary with shipping and tax calculations

### Checkout
- Fill in shipping information
- Enter payment details
- Review order summary
- Place order (clears cart and redirects to home)

## Angular Concepts Demonstrated

### Components
- Smart vs. Presentational components
- Component communication with @Input and @Output
- Lifecycle hooks (OnInit)
- Component styling with ViewEncapsulation

### Services
- Service injection via constructor
- BehaviorSubject for reactive state management
- LocalStorage integration for persistence
- Service separation of concerns

### Routing
- Route configuration
- Route parameters
- Navigation with Router
- RouterLink directive

### Forms
- Reactive forms with FormBuilder
- Form validation (required, pattern, minLength)
- Custom error messages
- Form state management

### Pipes
- Custom pipe creation
- Pipe transformation logic
- Pipe usage in templates

### Directives
- Attribute directives
- ElementRef and Renderer2
- Input properties in directives
- DOM manipulation

### Observables
- Async pipe usage
- Observable data streams
- Subscription management
- Reactive programming patterns

## Development

### Adding New Products
Edit `src/app/services/product.service.ts` to add or modify products in the mock data array.

### Styling
Global styles are in `src/styles.css`. Component-specific styles are in each component's CSS file.

### Dark Mode
Dark mode styles are implemented using CSS classes on the body element, controlled by the ThemeService.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
This project is for educational purposes.
