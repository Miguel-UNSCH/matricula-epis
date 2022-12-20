import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { UserService } from 'src/app/Services/user/user.service';
@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent {
  constructor(private userService : UserService, private route : Router){

  }

  goToLogin(){
    this.userService.logOut()
    this.route.navigate(['/login']);
  }
}
