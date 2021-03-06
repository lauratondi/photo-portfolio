import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AuthService } from '../../../services/auth.service';
import { GalleryService } from '../../../services/gallery.service';
import { Gallery } from '../../../models/Gallery';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css'],
})
export class GalleryDetailComponent implements OnInit {
  isLoggedIn: boolean;
  gallery: Gallery;
  id: string | any;
  // images: AngularFirestoreCollection<any>;
  // image: AngularFirestoreDocument;

  constructor(
    private authService: AuthService,
    private router: ActivatedRoute,
    private galleryService: GalleryService,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getGallery();
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  getGallery() {
    this.id = this.router.snapshot.paramMap.get('id');
    this.galleryService.getGallery(this.id).subscribe((gallery) => {
      this.gallery = gallery;
      console.log(gallery);
    });
  }
  deleteGallery(id: string | any) {
    this.galleryService.deleteGallery(id);
    console.log('Gallery deleted');
  }

  // getImages() {
  //   this.galleryService.getGalleryImages(this.id).subscribe((image: any) => {
  //     this.image = image;
  //     console.log(image)
  //   });
  // }
}
