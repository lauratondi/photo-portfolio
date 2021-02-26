import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gallery } from '../models/Gallery';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  galleryCollection: AngularFirestoreCollection<Gallery>;
  galleryDoc: AngularFirestoreDocument;
  galleries: Observable<Gallery[]>;
  gallery: Observable<Gallery>;
  downloadURL: Observable<string>;
  images: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getGalleries() {
    this.galleryCollection = this.afs.collection('galleries');

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

  // Reference to display in the database
  // getGallery(id: string) {
  //   return this.afs.doc<Gallery>(`galleries/${id}`);
  // }

  getGallery(id: string) {
    this.galleryDoc = this.afs.doc<Gallery>(`galleries/${id}`);

    this.gallery = this.galleryDoc.snapshotChanges().pipe(
      map((action) => {
        const data = action.payload.data();
        const id = action.payload.id;
        return { id, ...data };
      })
    );
    console.log(this.gallery);
    return this.gallery;
  }

  createGallery(gallery: Gallery) {
    return this.galleryCollection.add(gallery);
  }

  deleteGallery(id: string) {
    this.galleryDoc = this.afs.doc(`galleries/${id}`);
    this.galleryDoc.delete();
  }

  updateGallery(id: string) {
    // const path = `galleries/${id}/images/`;

    // const ref = this.storage.ref(`galleries/${id}/images/`);

    this.images = this.afs.collection(`galleries/${id}/images/`);

    this.storage
      .ref(`galleries/${id}/images/`)
      .getDownloadURL()
      .subscribe((url) => {
        this.downloadURL = url;
        console.log('Saved as collection');

        const data = { url };

        return this.images.add(data);
      });
  }
}
