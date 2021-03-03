import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { Image } from '../../../models/Image';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  images: Image[];
  id: string | any;

  constructor(
    private router: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.id = this.router.snapshot.paramMap.get('id');
    return this.imageService.getGalleryImages(this.id).subscribe((images) => {
      this.images = images;
      console.log(images);
    });
  }
}
