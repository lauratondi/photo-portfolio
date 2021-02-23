import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminsComponent } from './components/admins/admins.component';
import { LoginComponent } from './components/login/login.component';
import { GalleriesListComponent } from './components/galleries/galleries-list/galleries-list.component';
import { GalleryDashboardComponent } from './components/galleries/gallery-dashboard/gallery-dashboard.component';
import { GalleryDetailComponent } from './components/galleries/gallery-detail/gallery-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminsComponent,
    LoginComponent,
    GalleriesListComponent,
    GalleryDetailComponent,
    GalleryDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
