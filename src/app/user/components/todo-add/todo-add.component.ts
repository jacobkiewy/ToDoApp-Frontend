import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateHelper } from 'src/app/helper/dateHelper';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { ToDo } from 'src/app/models/toDo';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  toDoAddForm:FormGroup
  tokenHelper:TokenHelper = new TokenHelper()
  dateHelper:DateHelper = new DateHelper()
  priorityRadio:FormControl = new FormControl()

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private toDoService:TodoService
  ) {}

  ngOnInit(): void {
    this.createToDoAddForm()
  }

  createToDoAddForm(){
    this.toDoAddForm = this.formBuilder.group({
      title:['',Validators.required],
      description:['',Validators.required],
      priorityRadio: this.priorityRadio,
      startingDate:[this.dateHelper.dateHelper(new Date()),Validators.required],
      endingDate:[null],
      status:[true,Validators.required]
    })
  }

  toDoAdd(){
    if (this.toDoAddForm.valid) {
      let toDoModel:ToDo = Object.assign({},this.toDoAddForm.value)
      toDoModel.userId = this.tokenHelper.userId()
      toDoModel.priority1 = this.priorityRadio.value === 'p1' ? true : false
      toDoModel.priority2 = this.priorityRadio.value === 'p2' ? true : false
      toDoModel.priority3 = this.priorityRadio.value === 'p3' ? true : false
      console.log(toDoModel)
      if (
        toDoModel.priority1 === false &&
        toDoModel.priority2 === false &&
        toDoModel.priority3 === false
      ) {
        return this.toastrService.error('', 'Öncelik Derecesi Vermelisin');
      }
      this.toDoService.toDoAdd(toDoModel).subscribe(response =>{
        this.toastrService.success('',response.message)
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      }, responseError => {
        // for (let i = 0; i < responseError.error.Errors.length; i++) {
        //   this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
        // }
        console.log(responseError)
      })
    }else{
      this.toastrService.error('','Boş Alan Bırakmayınız!')
    }
    return;
  }
}
