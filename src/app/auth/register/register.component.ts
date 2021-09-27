import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loaded: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
    // console.log('component çalıştı');
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    this.loaded = false;
    if (this.registerForm.valid) {
      let registerModel: RegisterModel = Object.assign(
        {},
        this.registerForm.value
      );
      this.authService.register(registerModel).subscribe(
        (response) => {
          this.loaded = false;
          this.toastrService.success('', 'Kayıt Başarılı');
          this.router.navigate(['auth/login']);
        },
        (responseError) => {
          this.loaded = true;
          if (responseError.error.Errors != undefined) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                '',
                responseError.error.Errors[i].ErrorMessage
              );
            }
          }
          else{
            this.toastrService.error('',responseError.error.message)
          }
        }
      );
    } else {
      this.loaded = true;
      this.toastrService.error('', 'Boş Alan Bırakmaınız!');
    }
  }

  loginUrl() {
    this.router.navigate(['auth/login']);
  }
}
