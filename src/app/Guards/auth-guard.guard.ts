import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isUser! : any;
  constructor(private userService : UserService, private router : Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const USER = this.userService.getCurrentUser();
    if (USER){
      if(this.userService.VerifiedEmail(USER.email)){
        return this.userService.VerifiedEmail(USER.email)
      }else{
        this.router.navigate(['/forbidden']);
        return false
      }
      
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
