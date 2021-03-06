import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './main/contact/contact.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/signup.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { UserGalleryComponent } from './user/user-gallery/user-gallery.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const redirectToLogin = () => redirectUnauthorizedTo(['log-in'])
const redirectToUserPage = () => redirectLoggedInTo(['user-page'])

const routes: Routes = [
  {path: '', component: HomeComponent, ...canActivate(redirectToUserPage)},
  {path: 'gallery', component: GalleryComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'sign-up', component: SignUpComponent, ...canActivate(redirectToUserPage)},
  {path: 'log-in', component: LoginComponent, ...canActivate(redirectToUserPage)},
  {path: 'user-page', component: UserPageComponent, ...canActivate(redirectToLogin)},
  {path: 'user-gallery', component: UserGalleryComponent, ...canActivate(redirectToLogin)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
