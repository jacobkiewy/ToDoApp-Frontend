import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateHelper } from 'src/app/helper/dateHelper';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { ToDo } from 'src/app/models/toDo';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css'],
})
export class TodoUpdateComponent implements OnInit {
  toDoUpdateForm: FormGroup;
  tokenHelper:TokenHelper = new TokenHelper()
  nDate: string | undefined;
  dh: DateHelper = new DateHelper();
  priorityRadio: FormControl = new FormControl();
  @Input() toDoForUpdate: ToDo;

  constructor(
    private formBuilder: FormBuilder,
    private toDoService: TodoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.nDate = this.dh.dateHelper(this.toDoForUpdate.startingDate);
    this.createToDoUpdateForm();
    // console.log(this.toDoForUpdate)
  }

  createToDoUpdateForm() {
    this.toDoUpdateForm = this.formBuilder.group({
      title: [this.toDoForUpdate.title, Validators.required],
      description: [this.toDoForUpdate.description, Validators.required],
      priorityRadio: this.priorityRadio,
      startingDate: [this.dh.dateHelper(this.toDoForUpdate.startingDate)],
      endingDate: [this.toDoForUpdate.endingDate],
      status: [this.toDoForUpdate.status],
    });
  }

  toDoUpdate() {
    if (this.toDoUpdateForm.valid) {
      let toDoModel: ToDo = Object.assign({}, this.toDoUpdateForm.value);
      toDoModel.id = this.toDoForUpdate.id;
      toDoModel.userId = this.toDoForUpdate.userId
      toDoModel.priority1 = this.priorityRadio.value === 'p1' ? true : false;
      toDoModel.priority2 = this.priorityRadio.value === 'p2' ? true : false;
      toDoModel.priority3 = this.priorityRadio.value === 'p3' ? true : false;
      if (
        toDoModel.priority1 === false &&
        toDoModel.priority2 === false &&
        toDoModel.priority3 === false
      ) {
        return this.toastrService.error('', 'Öncelik Derecesi Vermelisin');
      }
      this.toDoService.toDoUpdate(toDoModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },responseError =>{
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error('',responseError.error.Errors[i].ErrorMessage);
          
        }
        console.log(responseError.error.Errors[0].ErrorMessage)
      });
    } else {
      this.toastrService.error('', 'Boş Alan Bırakmayınız!!');
    }
    return;
  }
}
