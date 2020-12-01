import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-6-datatable';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    DataTableModule,
    NgbModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
    NgbModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService
  ],
})
export class SharedModule { }
