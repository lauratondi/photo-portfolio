import { Component, OnInit, Input } from '@angular/core';
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
  downloadURL: Observable<string>;
  uploadPercent: Observable<number> | any;
  images: AngularFirestoreCollection;
  selection: FileList;

  constructor(
    private router: ActivatedRoute,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    // this.id = this.router.snapshot.paramMap.get('id');
  }

  detectFiles(event: any) {
    this.selection = event.target.files;
    console.log(this.selection);
  }

  uploadImages() {
    this.id = this.router.snapshot.paramMap.get('id');
    const file = this.selection[0];
    const name = file.name;
    const path = `galleries/${this.id}/images/${name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            this.downloadURL = url;
            console.log('Images uploaded');
          });
        })
      )
      .subscribe();

    if (file.type.split('/')[0] == 'image') {
      this.galleryService.updateGallery(this.id, name);
      console.log('Gallery updated');
    } else {
      console.log('File is not an image');
    }
  }
}
