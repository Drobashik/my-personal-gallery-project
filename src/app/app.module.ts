import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { ContactComponent } from './main/contact/contact.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { UserPageComponent } from './user/user-page/user-page.component';
import { UserGalleryComponent } from './user/user-gallery/user-gallery.component';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    ContactComponent,
    UserPageComponent,
    UserGalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
