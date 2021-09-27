import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CryptoHelper } from 'src/app/helper/cryptoHelper';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loaded:boolean
  cryptoHelper: CryptoHelper = new CryptoHelper();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['user/todo']);
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loaded = false
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.loaded = false
          let encodeToken = this.cryptoHelper.encrypted(response.data.token);
          localStorage.setItem('token', encodeToken);
          this.toastrService.success('', response.message);
          this.router.navigate(['user/todo']);
        },
        (responseError) => {
          this.loaded = true
          if (responseError.status === 0) {
            this.toastrService.error('', 'Sunucu Bağlantısı Yok!!');
          } else {
            this.toastrService.error('', responseError.error);
          }
        }
      );
    } else {
      this.loaded = true
      this.toastrService.error('', 'Boş Alan Bırakmayınız!');
    }
  }

  registerUrl(){
    this.router.navigate(['auth/register'])
  }
}
