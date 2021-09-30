import { HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CryptoHelper } from 'src/app/helper/cryptoHelper';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { ToDo } from 'src/app/models/toDo';
import { TodoService } from 'src/app/services/todo/todo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  p:number = 1
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
    // let myMoment:moment.Moment = moment(Date.now()).locale("tr")
    // let mm=moment('2021-09-30 15:00:55').locale('tr').fromNow()
    // console.log(mm)
    // console.log(myMoment.format('DD MMM dddd YYYY HH:mm:ss'))
  }

  getUserToDos() {
    let userId = this.tokenHelper.userId();

    this.toDoService.getUserToDos(userId).subscribe(
      (response) => {
          response.data.forEach((toDo) => {
            if (toDo.status === true) {
              this.toDos.push(toDo);
            }
          });
          this.dataLoaded = true;
          this.toastrService.info('', response.message);
      },
      (responseError) => {
        this.toastrService.error('', 'Sunucu Bağlantısı Yok!');
      }
    );
  }

  replace(Id: number) {
    let cryptoEncode = this.cryptoHelper.encrypted(Id.toString());
    let urlEncode = encodeURIComponent(cryptoEncode);
    this.router.navigate(['user/TodoDetail/' + urlEncode], {
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
