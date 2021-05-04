import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminsComponent } from './components/admins/admins.component';
import { LoginComponent } from './components/login/login.component';
import { GalleriesListComponent } from './components/galleries/galleries-list/galleries-list.component';
import { GalleryDetailComponent } from './components/galleries/gallery-detail/gallery-detail.component';
import { ImagesComponent } from './components/galleries/images/images.component';
import { ImageDetailComponent } from './components/galleries/image-detail/image-detail.component';
import { CreateGalleryComponent } from './components/galleries/create-gallery/create-gallery.component';
import { EditGalleryComponent } from './components/galleries/edit-gallery/edit-gallery.component';

const routes: Routes = [
  // { path: '', component: NavbarComponent },
  {
    path: 'admin',
    component: CreateGalleryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'galleries', component: GalleriesListComponent },
  { path: 'galleries/:id', component: GalleryDetailComponent },
  {
    path: 'galleries/:id',
    component: EditGalleryComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'galleries/:id/images', component: ImagesComponent },
  { path: 'galleries/:id/:id', component: ImageDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
