import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { GalleryService } from '../../../services/gallery.service';
import { Gallery } from '../../../models/Gallery';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-gallery',
  templateUrl: './create-gallery.component.html',
  styleUrls: ['./create-gallery.component.css'],
})
export class CreateGalleryComponent implements OnInit {
  galleryForm: FormGroup;
  galleryCollection: AngularFirestoreCollection;

  constructor(
    private galleryService: GalleryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.galleryForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  saveGallery() {
    const formData: Gallery = {
      title: this.galleryForm.get('title')!.value,
      description: this.galleryForm.get('description')!.value,
      // images: this.imageURL,
      trending: 0,
    };
    if (!this.galleryForm.untouched) {
      this.galleryService.createGallery(formData);
      console.log('Gallery created');
    }
  }
}
