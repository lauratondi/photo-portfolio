import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
// import { SwiperModule } from 'swiper/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { Image } from '../../../models/Image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  // @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  images: Image[] | any;
  id: string | any;
  name: string | any;
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imageService.getGalleryImages(this.id).subscribe((images) => {
      this.images = images;
      console.log(images);
    });
  }

  // onSwiper(swiper: any) {
  //   console.log(swiper);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }
}
