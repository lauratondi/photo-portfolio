import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryService } from '../../../services/gallery.service';
import { Gallery } from '../../../models/Gallery';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.css'],
})
export class GalleriesListComponent implements OnInit {
  galleries: Gallery[];

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.getGalleries();
    console.log(this);
  }

  // getGalleries() {
  //   this.galleries = this.galleryService.getGalleries();
  //   this.galleries.subscribe((res) => console.log(res));
  // }

  getGalleries() {
    return this.galleryService.getGalleries().subscribe((galleries) => {
      this.galleries = galleries;
      console.log(galleries);
    });
  }
}
