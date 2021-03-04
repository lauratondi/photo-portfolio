import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { Image } from '../../../models/Image';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
})
export class ImageDetailComponent implements OnInit {
  image: Image;
  id: string | any;

  constructor(
    private router: ActivatedRoute,
    private imageService: ImageService,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    this.id = this.router.snapshot.paramMap.get('id');
    this.imageService.getImageDetail(this.id).subscribe((image) => {
      this.image = image;
      console.log(image);
    });
  }
}
