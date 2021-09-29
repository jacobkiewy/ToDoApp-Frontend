import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedBack } from 'src/app/models/feedBack';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  addFeedBack(feedBack: FeedBack) {
    let newPath = this.apiUrl + '/FeedBack/add';
    return this.httpClient.post<ResponseModel>(newPath, feedBack);
  }
  deleteFeedBack(feedBack: FeedBack) {
    let newPath = this.apiUrl + '/feedback/delete';
    return this.httpClient.post<ResponseModel>(newPath, feedBack);
  }
  getAll() {
    let newPath = this.apiUrl + '/feedback/getall';
    return this.httpClient.get<ListResponseModel<FeedBack>>(newPath);
  }
}
