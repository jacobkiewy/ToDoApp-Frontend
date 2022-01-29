import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  SecurityContext,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Cropper from 'cropperjs';
import { ToastrService } from 'ngx-toastr';
import { TokenHelper } from 'src/app/helper/tokenHelper';
import { FeedBack } from 'src/app/models/feedBack';
import { FeedbackService } from 'src/app/services/feedBack/feedback.service';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.css'],
})
export class FeedbackAddComponent implements OnInit {
  feedBackForm: FormGroup;
  user: TokenHelper = new TokenHelper();
  formData = new FormData();
  url: any;
  cropper: Cropper;
  cropDiv: string;
  croppedImageUri: string;
  blobImage: any;
  imageContent: string;
  outputImage: string | undefined;
  defaultFile: File;

  constructor(
    private feedBackService: FeedbackService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cropDiv = 'width: 100%; height: 45vh; display: flex;';
    this.createFeedBackForm();
  }

  createFeedBackForm() {
    this.feedBackForm = this.formBuilder.group({
      userId: [this.user.userId(), Validators.required],
      fullName: [this.user.userName(), Validators.required],
      email: [this.user.userEmail(), Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      date: [new Date(Date.now())],
      status: [true],
    });
  }

  addFeedBack() {
    this.getCroppedImage()
    if (this.feedBackForm.valid) {
      let feedBackModel = Object.assign({}, this.feedBackForm.value);
      this.formData.append('UserId', feedBackModel.userId);
      this.formData.append('FullName', feedBackModel.fullName);
      this.formData.append('Email', feedBackModel.email);
      this.formData.append('Title', feedBackModel.title);
      this.formData.append('Description', feedBackModel.description);
      this.formData.append('Status', feedBackModel.status);

      console.log(this.formData);
      this.feedBackService.addFeedBack(this.formData).subscribe(
        (response) => {
          this.toastrService.success('', response.message);
          this.router.navigate(['user/todo']);
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('', 'Boş Alan Bırakmayınız! ');
    }
  }
  onSelectFile(fileInput: any) {
    let file = <File>fileInput.target.files[0];
    this.defaultFile = file;
    // this.formData.append('Image', file);

    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastrService.warning('', 'Only images are supported.');
      return;
    }

    const reader = new FileReader();
    // console.log(file);
    // this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.url = this.getBlobDataToUrl(reader.result);
    };
    setTimeout(() => {
      let image: any = document.getElementById('image');
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 16,
        background: true,
        viewMode: 1,
        preview: '.imgPreview',
        crop: (event) => {
          // console.log(event.detail);
          // const canvas = this.cropper.getCroppedCanvas();
          // this.croppedImageUri = canvas.toDataURL();
          // this.imageStyle = "width:50%; transform: translateX("+event.detail.x+"px) translateY("+event.detail.y+"px);"
          // console.log(this.imageStyle)
          // this.imageDestination = this.getBlobDataToUrl(canvas.toDataURL(file.type));
        },
      });
    }, 100);
  }

  getCroppedImage() {
    this.croppedImageUri = this.cropper.getCroppedCanvas().toDataURL();
    let blob = this.getBlobDataToUrl(this.croppedImageUri);
    let ff = new File(this.blobImage, this.defaultFile.name, {
      type: this.defaultFile.type,
    });
    this.formData.append("Image",ff)
    let fs = new FileReader();
    fs.readAsDataURL(ff);
    fs.onload = (e) => {
      this.outputImage = e.target?.result?.toString();
    };
    console.log(ff);
    this.cropDiv = 'display:none';
  }

  getBlobDataToUrl(dataUrl: any) {
    //test
    const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        // console.log(slice)
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      this.blobImage = byteArrays;
      this.imageContent = contentType;
      return blob;
    };
    //test

    let splitData = dataUrl.split(',');
    let splitDataType = splitData[0].split(':')[1].split(';')[0];
    let blobData = b64toBlob(splitData[1], splitDataType);
    // this.blobImage = blobData
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blobData));
  }
}
