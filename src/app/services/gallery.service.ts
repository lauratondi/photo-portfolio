import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gallery } from '../models/Gallery';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  galleryCollection: AngularFirestoreCollection<Gallery>;
  galleryDoc: AngularFirestoreDocument;
  // galleries: Gallery[];
  galleries: Observable<Gallery[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getGalleries() {
    this.galleryCollection = this.afs.collection('albums');

    return this.galleryCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getImage(id: string) {
    return this.afs.doc<Gallery>(`albums/${id}/images`);
  }

  createGallery(data: Gallery) {
    return this.galleryCollection.add(data);
  }
}
