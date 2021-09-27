import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ToDo } from 'src/app/models/toDo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  toDoAdd(toDo: ToDo) {

    let newPath = this.apiUrl + '/todo/add';
    return this.httpClient.post<ResponseModel>(newPath, toDo);
  }

  getUserToDos(userId: number) {
    let newPath = this.apiUrl + '/todo/getusertodos?userId=' + userId;
    return this.httpClient.get<ListResponseModel<ToDo>>(newPath);
  }
  getToDo(Id: number) {
    let newPath = this.apiUrl + '/todo/getbyid?Id=' + Id;
    return this.httpClient.get<SingleResponseModel<ToDo>>(newPath);
  }

  toDoUpdate(toDo: ToDo) {
    let newPath = this.apiUrl + '/todo/update';
    return this.httpClient.post<ResponseModel>(newPath, toDo);
  }

  toDoDelete(toDo: ToDo) {
    let newPath = this.apiUrl + '/todo/delete';
    return this.httpClient.post<ResponseModel>(newPath, toDo);
  }
}
