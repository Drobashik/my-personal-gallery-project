import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingHandler } from 'src/app/services/loading-handler';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInFormGroup: FormGroup;
  invalidForm: boolean = false;
  loadingHandler = new LoadingHandler();

  constructor(private  authService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.logInFormGroup = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    })
    
  }
  
  onSubmit() {
    this.loadingHandler.beginLoading()
    if (this.logInFormGroup.valid) {
      const {email, password} = this.logInFormGroup.value;
      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.invalidForm = false
          this.loadingHandler.endLoading()
          this.router.navigate(['/user-page'])
        },
        error: (error) => {
          console.error(error);
          this.invalidForm = true;
          this.loadingHandler.endLoading()
        }
      })
    }
  }
}
