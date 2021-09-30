import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ToastrModule } from 'ngx-toastr';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TodosComponent } from './components/todos/todos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './components/users/users.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterDatePipe } from './pipes/filter-date.pipe';

@NgModule({
  declarations: [
    AdminComponent,
    SideBarComponent,
    TodosComponent,
    UsersComponent,
    FeedbackComponent,
    FilterUserPipe,
    FilterDatePipe,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
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
  ],
})
export class AdminModule {}
