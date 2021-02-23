import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminsComponent } from './components/admins/admins.component';
import { LoginComponent } from './components/login/login.component';
import { GalleriesListComponent } from './components/galleries/galleries-list/galleries-list.component';
import { GalleryDetailComponent } from './components/galleries/gallery-detail/gallery-detail.component';

const routes: Routes = [
  // { path: '', component: NavbarComponent },
  { path: 'admin', component: AdminsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'galleries', component: GalleriesListComponent },
  { path: 'galleries/:id', component: GalleryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
