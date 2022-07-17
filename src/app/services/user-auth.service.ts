import { Injectable } from "@angular/core";
import { Auth, authState } from "@angular/fire/auth";
import { FormGroup } from "@angular/forms";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { from, map, Observable, switchMap } from "rxjs";
import { User } from "../models/user.model";

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

    // getUsers(id: string):Observable<User[]> {
    //     return this.http.get<DtoUserCollection>(`${this.usersURL}/.json`).pipe(
    //         map(dataUser => {
    //             return Object.entries(dataUser).map(([key, dtoUser]) => {
    //                 const user: User = {
    //                     name: dtoUser.name,
    //                     email: dtoUser.email,
    //                     password: dtoUser.password,
    //                 }
    //                 return user;
    //             })
    //         })
    //     )
    // }
    

    // createUser(user: User): Observable<DtoUserKey> {
    //     return this.http.post<DtoUserKey>(`${this.usersURL}.json`, user).pipe(
    //         map(userResponseKey => {
    //             return userResponseKey;
    //         })
    //     )
    // }



}