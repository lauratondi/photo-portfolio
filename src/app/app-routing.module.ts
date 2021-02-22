import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminsComponent } from './components/admins/admins.component';
import { LoginComponent } from './components/login/login.component';
// import { GalleriesComponent } from './components/galleries/galleries.component';

const routes: Routes = [
  // { path: '', component: NavbarComponent },
  { path: 'admin', component: AdminsComponent },
  { path: 'login', component: LoginComponent },
  //   { path: 'galleries', component: GalleriesComponent },//
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
