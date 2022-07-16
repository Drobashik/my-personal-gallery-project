import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInFormGroup: FormGroup;

  constructor(private  authService: UserAuthService) { }

  ngOnInit(): void {
    this.logInFormGroup = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    })
    
  }
  
  onSubmit() {
    if(this.logInFormGroup.valid) {
      this.authService.getUsers(this.logInFormGroup.value.password).subscribe(data => {
        console.log(data);
      })
      console.log(this.logInFormGroup.value);
      return;
    }
    console.error('Invalid form')
  }

}
