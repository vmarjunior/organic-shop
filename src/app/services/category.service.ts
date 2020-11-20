import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getAll() {
    return this.db.collection('/categories').stateChanges()
      .pipe(
        map(categories =>
          categories.map(cat => ({
            key: cat.payload.doc.id,
            name: (cat.payload.doc.data() as any).name
          })).sort((a, b) => (a.name > b.name ? 1 : -1)) //ascending
          //.sort((a, b) => (a.name > b.name ? -1 : 1)) descending
        )
      );
  }
}
