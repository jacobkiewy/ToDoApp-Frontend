import { HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { CryptoHelper } from 'src/app/helper/cryptoHelper';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { ToDo } from 'src/app/models/toDo';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  toDos: ToDo[] = [];
  dataLoaded = false;
  tokenHelper: TokenHelper = new TokenHelper();
  cryptoHelper: CryptoHelper = new CryptoHelper();

  constructor(
    private toastrService: ToastrService,
    private toDoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserToDos();
  }

  getUserToDos() {
    let userId = this.tokenHelper.userId();
    this.toDoService.getUserToDos(userId).subscribe((response) => {
      response.data.forEach(toDo => {
        if (toDo.status === true) {
          this.toDos.push(toDo);
        }
      });
      this.dataLoaded = true;
      this.toastrService.info('', response.message);
    });
  }

  replace(Id: number) {
    let cryptoEncode = this.cryptoHelper.encrypted(Id.toString());
    this.router.navigate(['user/TodoDetail/' + cryptoEncode], {
      replaceUrl: true,
    });
  }

  toDoCompleted(Id: number) {
    this.toDoService.getToDo(Id).subscribe((response) => {
      let toDo = response.data;
      toDo.status = false;
      this.toDoService.toDoUpdate(toDo).subscribe(
        (response) => {
          this.toastrService.success('', toDo.title + ': ToDo Tamamlandı');
          setTimeout(() => {
            window.location.reload();
          }, 1250);
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    });
  }
}
