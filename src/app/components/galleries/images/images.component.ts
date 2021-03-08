import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { Image } from '../../../models/Image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  images: Image[] | any;
  id: string | any;
  name: string | any;
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

  prevSlide() {
    this.carousel.prev();
  }

  nextSlide() {
    this.carousel.next();
  }

  stopSlide() {
    this.carousel.pause();
  }
}
