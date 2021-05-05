import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

import { GalleryService } from '../../../services/gallery.service';
import { Gallery } from '../../../models/Gallery';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.css'],
})
export class GalleriesListComponent implements OnInit {
  galleries: Gallery[];
  isLoggedIn: boolean;

  constructor(
    private galleryService: GalleryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getGalleries();
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  getGalleries() {
    return this.galleryService.getGalleries().subscribe((galleries) => {
      this.galleries = galleries;
      console.log(galleries);
    });
  }
}
