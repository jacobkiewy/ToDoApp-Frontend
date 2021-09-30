import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  private tokenHelper: TokenHelper = new TokenHelper();

  constructor(private httpClient: HttpClient) {}

  login(user: LoginModel) {
    let newPath = this.apiUrl + '/auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user);
  }
  register(user: RegisterModel) {
    let newPath = this.apiUrl + '/auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user);
  }

  isAuthenticated() {
    if (this.tokenHelper.decodeToken() != false) {
      return true;
    } else {
      return false;
    }
  }
}
