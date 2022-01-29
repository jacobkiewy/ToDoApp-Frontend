import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FeedBack } from 'src/app/models/feedBack';
import { FeedbackService } from 'src/app/services/feedBack/feedback.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedBacks: FeedBack[] = [];
  p: number = 1;
  imagePath = environment.feedBakcImageBasePath;

  constructor(
    private feedBackService: FeedbackService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllFeedBack();
  }

  getAllFeedBack() {
    this.feedBackService.getAll().subscribe(
      (response) => {
        (this.feedBacks = response.data),
          this.toastrService.info('', response.message);
        console.log(response.data);
        let image: any = document.getElementById('image');
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }

  delete(feedBack: FeedBack) {
    this.feedBackService.deleteFeedBack(feedBack).subscribe(
      (response) => {
        window.location.reload();
        this.toastrService.warning('', response.message);
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }

  update(feedBack: FeedBack) {
    feedBack.status = false;
    this.feedBackService.updateFeedBack(feedBack).subscribe(
      (response) => {
        // window.location.reload();
        console.log(response);
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }
}
