import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Admin } from '../models/Admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminsCollection: AngularFirestoreCollection<Admin>;
  // adminDoc: AngularFirestoreDocument<Admin>;

  admins: Observable<Admin[]> | any;
  // admin: Observable<Admin>;

  constructor(private afs: AngularFirestore) {
    this.adminsCollection = this.afs.collection('admins');
  }

  getAdmins(): Observable<Admin[]> {
    this.admins = this.adminsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data();
          data.id = action.payload.doc.id;

          return { ...data };
        });
      })
    );

    return this.admins;
  }
}
