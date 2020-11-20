import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product: any = {};
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id)
      this.productService.get(this.id)
        .pipe(take(1))
        .subscribe(p => { this.product = p.data(); });
  }

  save(product) {

    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {

    if (!confirm('Are you sure you want to delete this product?'))
      return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
