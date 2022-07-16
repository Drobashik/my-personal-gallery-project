import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpFormGroup: FormGroup;
  areValidPasswords: boolean = true;

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required,  Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      repeatedPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
  }

  onSubmitSignUpForm(): void {
    this.areValidPasswords = this.userAuthService.checkPasswordsValidation(this.signUpFormGroup)
    if (this.signUpFormGroup.valid && this.areValidPasswords) {
      console.log(this.signUpFormGroup.value);
      const user: User = {
        name: this.signUpFormGroup.value.name,
        email: this.signUpFormGroup.value.email,
        password: this.signUpFormGroup.value.password,
      }
      this.userAuthService.createUser(user).subscribe((data) => {
        this.router.navigate(['/log-in'])
      })
      return;
    }
    this.signUpFormGroup.invalid
  }

}
