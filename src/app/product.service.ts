import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }


  create(product) {
    return this.db.collection('/products').add(product);
  }

  getAll() {
    return this.db.collection('/products').snapshotChanges()
      .pipe(
        map(products =>
          products.map(prod => ({
            key: prod.payload.doc.id,
            data: prod.payload.doc.data()
          }))
        )
      );

    //Obsolete
    /*
    return this.db.collection('/products').snapshotChanges()
      .pipe(
        map(products =>
          products.map(prod => ({
            key: prod.payload.doc.id,
            category: (prod.payload.doc.data() as any).category,
            title: (prod.payload.doc.data() as any).title,
            imageUrl: (prod.payload.doc.data() as any).imageUrl,
            price: (prod.payload.doc.data() as any).price
          })).sort((a, b) => (a.title > b.title ? 1 : -1))
        )
      );
      */
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
