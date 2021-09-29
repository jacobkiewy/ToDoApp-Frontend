import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenHelper } from 'src/app/helper/tokenHelper';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  tokenHelper:TokenHelper = new TokenHelper()
  user:string

  constructor(
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.user = this.tokenHelper.userName()
  }

  logOut(){
    localStorage.removeItem('token')
    this.toastrService.warning('','Çıkış Yapıldı')
    this.router.navigate(['auth/login'])
  }
}
