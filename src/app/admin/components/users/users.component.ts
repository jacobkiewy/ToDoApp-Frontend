import { APP_ID, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filterText = '';

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.data;
      this.toastrService.info('', response.message);
    });
  }

  update(user: User) {
    user.status === true ? (user.status = false) : (user.status = true);
    this.userService.userUpdate(user).subscribe(response =>{
      console.log(response)
    }, responseError => {
      console.log(responseError)
    })
  }
}
