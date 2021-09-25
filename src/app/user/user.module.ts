import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ToastrModule } from "ngx-toastr";
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoCompletedComponent } from './components/todo-completed/todo-completed.component';


@NgModule({
  declarations: [
    UserComponent,
    SideBarComponent,
    TodoComponent,
    TodoAddComponent,
    TodoUpdateComponent,
    TodoDetailComponent,
    TodoCompletedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule { }
