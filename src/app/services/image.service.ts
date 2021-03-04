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
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  images: Observable<Image[]>;
  image: Observable<any>;
  imageCollection: AngularFirestoreCollection<Image>;
  imageDoc: AngularFirestoreDocument;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getGalleryImages(id: string) {
    this.imageCollection = this.afs.collection(`galleries/${id}/images`);

    this.images = this.imageCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.images;
  }

  getImageDetail(id: string) {
    this.imageDoc = this.afs.doc<Image>(`galleries/${id}images/${id}`);

    this.image = this.imageDoc.snapshotChanges().pipe(
      map((action) => {
        const data = action.payload.data();
        const id = action.payload.id;

        return { id, ...data };
      })
    );
    return this.image;
  }
}
