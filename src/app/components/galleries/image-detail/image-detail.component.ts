import { Component, OnInit, Input } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { GalleryService } from '../../../services/gallery.service';
import { Image } from '../../../models/Image';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
})
export class ImageDetailComponent implements OnInit {
  image: Image | any;
  id: string;
  name: string | any;
  url: string;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,

    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    const id = this.route.snapshot.paramMap.get('id');
    this.imageService.getImageDetail(id).subscribe((image) => {
      this.image = image;
      console.log(image);
      return image;
    });
  }
}
