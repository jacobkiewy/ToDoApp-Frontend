import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.baseUrl

  constructor(
    private httpClient:HttpClient
  ) { }


  getAllUsers() {
    let newPath = this.apiUrl + '/user/getallusers';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  userUpdate(user:User){
    let newPath = this.apiUrl+'/user/update'
    return this.httpClient.post<ResponseModel>(newPath,user)
  }
}
