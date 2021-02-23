import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GalleryService } from '../../../services/gallery.service';
import { Gallery } from '../../../models/Gallery';

@Component({
  selector: 'app-gallery-dashboard',
  templateUrl: './gallery-dashboard.component.html',
  styleUrls: ['./gallery-dashboard.component.css'],
})
export class GalleryDashboardComponent implements OnInit {
  galleryForm: FormGroup;
  uploadPercent: Observable<any>;
  downloadURL: Observable<string>;
  imageURL: string | any;

  constructor(
    private galleryService: GalleryService,
    private storage: AngularFireStorage,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createGallery();
  }

  createGallery() {
    this.galleryForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  saveGallery() {
    const formData: Gallery = {
      title: this.galleryForm.get('title')!.value,
      description: this.galleryForm.get('description')!.value,
      images: this.imageURL,
      trending: 0,
    };
    if (!this.galleryForm.untouched) {
      this.galleryService.createGallery(formData);
      console.log('Gallery created');
    }
  }

  uploadImages(event: any) {
    const file = event.target.files;
    const path = `galleries/${file.name}/`;
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
  }
}
