import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/signup.component";

@NgModule({
    declarations: [
        LoginComponent, 
        SignUpComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule {
    
}