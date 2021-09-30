import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { FeedBack } from 'src/app/models/feedBack';
import { FeedbackService } from 'src/app/services/feedBack/feedback.service';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.css']
})
export class FeedbackAddComponent implements OnInit {
  feedBackForm:FormGroup
  user:TokenHelper = new TokenHelper()

  constructor(
    private feedBackService:FeedbackService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createFeedBackForm()
  }

  createFeedBackForm(){
    this.feedBackForm = this.formBuilder.group({
      userId:[this.user.userId(),Validators.required],
      fullName:[this.user.userName(),Validators.required],
      email:[this.user.userEmail(),Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
      date:[new Date(Date.now())],
      status:[true]
    })
  }

  addFeedBack(){
    console.log(this.feedBackForm.value)
    if (this.feedBackForm.valid) {
      let feedBackModel:FeedBack = Object.assign({},this.feedBackForm.value)
      this.feedBackService.addFeedBack(feedBackModel).subscribe(response=>{
        this.toastrService.success('',response.message)
        this.router.navigate(['user/todo'])
      },responseError => {
        console.log(responseError)
      })
    }
    else{
      this.toastrService.error('','Boş Alan Bırakmayınız! ')
    }
  }
}
