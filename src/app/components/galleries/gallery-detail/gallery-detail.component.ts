import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../../services/gallery.service';
import { Gallery } from '../../../models/Gallery';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css'],
})
export class GalleryDetailComponent implements OnInit {
  gallery: Gallery;
  id: string | any;

  constructor(
    private router: ActivatedRoute,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    this.getGallery();
    console.log(this);
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
}
