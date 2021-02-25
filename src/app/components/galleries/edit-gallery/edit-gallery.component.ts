import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../../services/gallery.service';
import { Gallery } from '../../../models/Gallery';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.css'],
})
export class EditGalleryComponent implements OnInit {
  id: string | any;
  imageURL: Observable<string>;
  images: AngularFirestoreCollection;
  selection: FileList;

  constructor(
    private router: ActivatedRoute,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {}

  detectFiles(event: any) {
    this.selection = event.target.files;
    console.log(this.selection);
  }

  // upload() {
  //   const file = this.selection[0];

  //   this.imageService.uploadImages(file);
  // }
  uploadImages() {
    this.id = this.router.snapshot.paramMap.get('id');
    const file = this.selection[0];
    const name = file.name;
    const path = `galleries/${this.id}/${name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((downloadURL) => {
            this.imageURL = downloadURL;
            console.log('Images uploaded');
          });
        })
      )
      .subscribe();
    if (file.type.split('/')[0] == 'image') {
      this.galleryService.updateGallery(this.id, this.images);
      console.log('Gallery updated');
    }
  }
}

// saveInGallery() {
//   this.galleryService.updateGallery(this.id, this.images);
//   console.log('Gallery updated');
// }
// this.images = this.afs.collection(path);
// ref.getDownloadURL().subscribe((url) => {
//   console.log('Saved as collection');

//   const data = { name, url };

//   return this.images.add(data);
// });
