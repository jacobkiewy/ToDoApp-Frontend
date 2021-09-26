import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CryptoHelper } from 'src/app/helper/cryptoHelper';
import { ToDo } from 'src/app/models/toDo';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  toDo: ToDo;
  cryptoHelper: CryptoHelper = new CryptoHelper();
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private toDoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getToDo(params['Id']);
    });
  }

  getToDo(Id: number) {
    try {
      let urlDecode = decodeURIComponent(Id.toString());
      let decodeId = +this.cryptoHelper.decrypted(urlDecode);
      if (decodeId === 0 || decodeId === null || decodeId === undefined) {
        this.router.navigate(['**']);
      }
      this.toDoService.getToDo(decodeId).subscribe((response) => {
        this.toDo = response.data;
        try {
          response.data.status === false
            ? this.toastrService.info('', "Bu ToDo'yu Tamamladın")
            : null;
        } catch (error) {
          this.toastrService.error('','Çok Kurcalama Burları Hepsini Kontrol Ettim')
        }
      });
    } catch (error) {
      this.router.navigate(['**']);
    }
  }
  toDoCompleted() {
    this.toDo.status = false;
    this.toDoService.toDoUpdate(this.toDo).subscribe(
      (response) => {
        this.toastrService.success('', 'ToDo Tamamlandı ;)');
        setTimeout(() => {
          window.location.reload();
        }, 1250);
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }
}
