import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TokenHelper } from '../helper/tokenHelper';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  tokenHelper: TokenHelper = new TokenHelper();
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let exp = +new Date(this.tokenHelper.userRoleExp() * 1000);
    if (this.authService.isAuthenticated()) {
      if (this.tokenHelper.userRole() === 'admin' && Date.now() < exp) {
        return true;
      } else {
        this.toastrService.error('', 'Yetki Yok!');
        this.router.navigate(['user/todo']);
        return false;
      }
    } else {
      this.toastrService.error('', 'Giriş Yapınız!');
      this.router.navigate(['auth/login']);
      return true;
    }
  }
}
