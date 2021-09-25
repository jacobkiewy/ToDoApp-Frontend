import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
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
