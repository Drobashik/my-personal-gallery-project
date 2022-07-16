import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInFormGroup: FormGroup;
  invalidForm: boolean = false;

  constructor(private  authService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.logInFormGroup = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    })
    
  }
  
  onSubmit() {
    if (this.logInFormGroup.valid) {
      const {email, password} = this.logInFormGroup.value;
      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.invalidForm = false
          this.authService.isLoggedIn = true;
          this.router.navigate(['/user-page'])
          console.log(data);
        },
        error: (error) => {
          console.error(error);
          this.invalidForm = true;
        }
      })
    }
  }
}
