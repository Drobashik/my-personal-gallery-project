import { Injectable } from "@angular/core";
import { Auth, authState } from "@angular/fire/auth";
import { FormGroup } from "@angular/forms";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { from, map, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class UserAuthService {

    usersURL: string = 'https://gallery-23284-default-rtdb.firebaseio.com/users'
    currentUser$ = authState(this.auth)

    constructor( private auth: Auth ) {}

    login(email: string, password: string) {
        return from(signInWithEmailAndPassword(this.auth, email, password))
    }

    logout() {
        return from(this.auth.signOut())
    }

    signUp(name: string, email: string, password: string) {
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
            switchMap(({user}) => updateProfile(user, {displayName: name}))
        )
    }

    checkPasswordsValidation(signUpForm:  FormGroup): boolean {
        if(signUpForm.value.password !== signUpForm.value.repeatedPassword) {
          return false
        }
        return true;
      }

}