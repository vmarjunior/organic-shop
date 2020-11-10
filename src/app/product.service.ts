import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }


  create(product) {
    return this.db.collection('/products').add(product);
  }

  getAll<T>() {
    return this.db.collection('/products').snapshotChanges()
      .pipe(
        map(products =>
          products.map(prod => {
            const value = <any>Object.assign({}, prod.payload.doc.data());
            value.key = prod.payload.doc.id;
            return <T>value;
          })
        )
    );

    //.sort((a, b) => (a.title > b.title ? 1 : -1))
  }

  get(productId) {
    return this.db.collection('/products/').doc(productId).get();
  }

  update(productId, product) {
    return this.db.collection('/products/').doc(productId).update(product);
  }

  delete(productId) {
    return this.db.collection('/products/').doc(productId).delete();
  }

}
