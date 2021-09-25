import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    Error404Component,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      extendedTimeOut: 1000,
      progressBar: true,
      easing: 'ease-in',
      easeTime: 300,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      maxOpened: 5,
      autoDismiss: true,
    }),
  ]
})
export class AuthModule { }
