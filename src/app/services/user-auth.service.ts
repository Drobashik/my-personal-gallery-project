import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { map, Observable } from "rxjs";
import { DtoUserCollection, DtoUserKey } from "../dto/user-list.dto";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root',
})

export class UserAuthService {

    usersURL: string = 'https://gallery-23284-default-rtdb.firebaseio.com/users'
    userId: string;

    constructor( private http: HttpClient ) {}

    getUsers(id: string):Observable<User[]> {
        return this.http.get<DtoUserCollection>(`${this.usersURL}/.json`).pipe(
            map(dataUser => {
                return Object.entries(dataUser).map(([key, dtoUser]) => {
                    const user: User = {
                        name: dtoUser.name,
                        email: dtoUser.email,
                        password: dtoUser.password,
                    }
                    return user;
                })
            })
        )
    }
    

    createUser(user: User): Observable<DtoUserKey> {
        return this.http.post<DtoUserKey>(`${this.usersURL}.json`, user).pipe(
            map(userResponseKey => {
                return userResponseKey;
            })
        )
    }


    checkPasswordsValidation(signUpForm:  FormGroup): boolean {
        if(signUpForm.value.password !== signUpForm.value.repeatedPassword) {
          return false
        }
        return true;
      }

}