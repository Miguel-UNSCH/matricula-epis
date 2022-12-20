import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { Auth} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isUser! : any;

  loading: boolean = false;

  alert = Swal.mixin({
    toast: true,
    // icon: 'success',
    timer: 3000,
    // text: 'Bienvenido estimado usuario',
    showConfirmButton: false,
    // background: 'green',
    position: 'top',
    color: 'white',
  })

  userExists(){
    this.isUser = this.userService.getCurrentUser()
  }

  // here Constructor
  constructor(private auth : Auth, private route : Router, private userService : UserService){ 
    this.userExists()
    if(this.isUser){
      this.route.navigate(['/usuario'])
    }
  }
  obs = new Observable((subs) => {
    setTimeout(()=>{
      subs.next(1);
      subs.complete();
    }, 2000)
  })

  loginWithGoogle() : void{
    const UserServe = this.userService
    const ALERT = this.alert
    const OBS = this.obs;
    // let load = this.loading

    let ROUTE = this.route

    function GoMainPage(){
      ROUTE.navigate(['/usuario']);
    }
    
    function VerifiedEmail(email: any) : boolean {
      let verifiedText = ''
      let dominioEscuela = '27@unsch.edu.pe'

      if (email !== undefined){
        let activate = false
        for(let pos = 0; pos < email.length; pos++){
          if (email[pos] == '@'){
            verifiedText += email[pos-2] + email[pos-1]
            activate = true
          }
          if (activate){
            verifiedText += email[pos]
          }
        }
      }
      return verifiedText== dominioEscuela
    } 
    this.userService.loginWhitGoogle().then((data) => {
      this.loading = true;
      OBS.subscribe({
        next(x) {
          GoMainPage();
        },
        complete(){
          if (VerifiedEmail(data.user.email)){
            ALERT.fire({
              text: 'Bienvenido estimado: ' + data.user.displayName,
              background: 'green',
              icon: 'success'
            });

            UserServe.VerificarUser(true)
          }else{
            ALERT.fire({
              text: 'INICIE SESIÓN CON CORREO INSTITUCIONAL',
              background: 'red',
              icon: 'error'
            })
            UserServe.VerificarUser(false)
          }         
        }
      });
      
    }, err => {console.error('Ocurrió un error: ', err.message)});
  }

  ngOnInit(): void {
    
  }
  
}
