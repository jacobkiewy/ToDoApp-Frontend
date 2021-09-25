import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoCompletedComponent } from './components/todo-completed/todo-completed.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';
import { TodoComponent } from './components/todo/todo.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    children:[
      {
        path:'todo',
        component:TodoComponent
      },
      {
        path:'TodoDetail/:Id',
        component:TodoDetailComponent,
      },
      {
        path:'TodoComplete',
        component:TodoCompletedComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
