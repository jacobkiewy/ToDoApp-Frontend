import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TodosComponent } from './components/todos/todos.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'todos',
        component:TodosComponent
      },
      {
        path:'users',
        component:UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
