import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AppUser } from './../models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {

    //Admins: you should add the field 'isAdmin: true' on firestore manually

    this.db.doc('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }).catch(() =>
      this.db.doc('/users/' + user.uid).set({
        name: user.displayName,
        email: user.email
      }).catch((reason: any) => console.log('User save failed:', reason)));
  }

  get(uid: string): Observable<AppUser> {
    return this.db.collection('/users/').doc(uid).valueChanges() as Observable<AppUser>;
  }

}
