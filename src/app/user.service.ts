import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AppUser } from './models/add-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    this.db.doc('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email
    }, { merge: true })
      .catch((reason: any) => console.log('User save failed:', reason));
  }

  get(uid: string): Observable<AppUser> {
    return this.db.collection('/users/').doc(uid).valueChanges() as Observable<AppUser>;
  }

}
