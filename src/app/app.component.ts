import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( public userAuthService: UserAuthService, private router: Router ) {}
  

  logOut() {
    this.userAuthService.logout().subscribe(() => {
      this.router.navigate(['log-in'])
    })
  }
}
