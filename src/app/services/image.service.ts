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
import { Gallery } from '../models/Gallery';
import { GalleryService } from '../services/gallery.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  images: Observable<Image[]>;
  image: Observable<any>;
  gallery: Observable<Gallery>;
  imageCollection: AngularFirestoreCollection<Image>;
  imageDoc: AngularFirestoreDocument<Image>;
  url!: string;
  name: string;
  galleryId: any;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private galleryService: GalleryService
  ) {}

  getGalleryImages(galleryId: string | any): Observable<Image[]> {
    this.imageCollection = this.afs.collection(`galleries/${galleryId}/images`);

    this.images = this.imageCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Image;
          console.log(data);
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.images;
  }

  getImageDetail(id: string | any) {
    this.imageDoc = this.afs.doc(`galleries/${this.galleryId}/images/${id}`);

    this.image = this.imageDoc.snapshotChanges().pipe(
      map((action) => {
        const data = action.payload.data();

        const id = action.payload.id;
        console.log(data, id);
        return { id, ...data };
      })
    );

    return this.image;
  }
}
