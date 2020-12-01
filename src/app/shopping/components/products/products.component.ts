import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  cartSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cartSubscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);

    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(
      switchMap((products: Product[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filterProducts();
    });
  }

  private filterProducts() {
    this.filteredProducts = (this.category) ?
      this.filteredProducts = this.products.filter(p => p.category === this.category) :
      this.products;
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }


}
