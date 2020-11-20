import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll<Product>().subscribe(products => this.products = this.filteredProducts = products);
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => (p.title as string).toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
