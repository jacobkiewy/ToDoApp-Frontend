import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToDo } from 'src/app/models/toDo';
import { ToDoDto } from 'src/app/models/toDoDto';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  totalLength:any
  p: number = 1;
  toDos: ToDoDto[] = [];

  constructor(
    private toDoService: TodoService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllToDos();
  }

  getAllToDos() {
    this.toDoService.getAllToDos().subscribe(
      (response) => {
        this.toDos = response.data;
        this.totalLength = response.data.length
        this.toastrService.info('', response.message);
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }
}
