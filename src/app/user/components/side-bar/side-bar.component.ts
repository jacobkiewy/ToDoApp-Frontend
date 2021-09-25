import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  count: number;
  tokenHelper: TokenHelper = new TokenHelper();
  role:boolean
  user:string

  constructor(private toDoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.completeCount();
    this.adminRole();
    this.user = this.tokenHelper.userName();
  }

  completeCount() {
    let num = 1;
    let userId = this.tokenHelper.userId()
    this.toDoService.getUserToDos(userId).subscribe((response) => {
      response.data.forEach((element) => {
        if (element.status == false) {
          this.count = num++;
        }
      });
    });
  }

  adminUrl() {
    this.router.navigate(['admin/todos'], { replaceUrl: true });
  }

  adminRole() {
    this.role = this.tokenHelper.userRole() === 'admin' && Date.now() < +new Date(this.tokenHelper.userRoleExp()*1000) ? true : false;
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(["auth/login"], { replaceUrl:true})
  }
}
