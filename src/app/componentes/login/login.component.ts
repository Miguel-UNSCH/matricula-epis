import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { Auth, User, getAuth, getRedirectResult, GoogleAuthProvider, updateCurrentUser} from '@angular/fire/auth';
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

  userExists(): User | null {
    return this.userService.getCurrentUser();
  }

  // here Constructor
  constructor(private auth : Auth, private route : Router, private userService : UserService){ 
    
    if(this.userExists()){
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
    
    this.userService.loginWhitGoogle().then((data ) => {
      const auth = getAuth()
      localStorage.setItem('407h', JSON.stringify({
        auth : auth,
        currentUser : auth.currentUser
      }))
      let email = auth.currentUser?.email
      let name = auth.currentUser?.displayName
      
      // login user
      this.loading = true;
      OBS.subscribe({
        next(x) {
          GoMainPage();
        },
        complete(){
          if (UserServe.VerifiedEmail(email)){
            ALERT.fire({
              text: 'Bienvenido estimado: ' + name,
              background: 'green',
              icon: 'success'
            });

            UserServe.VerificarUser(true)
            // localStorage.setItem('UID',  JSON.stringify(data.user))
          }else{
            ALERT.fire({
              text: 'INICIE SESIÓN CON CORREO INSTITUCIONAL ' + email + " no permitido",
              background: 'red',
              icon: 'error'
            })
            UserServe.VerificarUser(false)
          }         
        }
      });
      
    }, err => {console.error('Ocurrió un error: ', err.message);
    ALERT.fire({
      text: '¡Ocurrió un error inesperado! ' + "\n consulte con el administrador para resolver el problema",
      background: 'red',
      icon: 'error'
    })
  
              });
  }

  ngOnInit(): void {
    if(this.data){
      this.auth0 = this.data.auth
    
      //
      let isUser = this.auth0.currentUser
      if(isUser){
        // updateCurrentUser(this.auth0, isUser)
        if (this.userService.VerifiedEmail(isUser.email)){
          this.alert.fire({
            text: 'Bienvenido estimado: ' + isUser.displayName,
            background: 'green',
            icon: 'success'
          });
          this.userService.VerificarUser(true)
          this.route.navigate(['/usuario']);
        }else{
          this.alert.fire({
            text: 'INICIE SESIÓN CON CORREO INSTITUCIONAL ' + isUser.email + " no permitido",
            background: 'red',
            icon: 'error',
            timer: 3500
          })
          this.userService.VerificarUser(false)
          this.route.navigate(['/usuario']);
        } 
      }
  }
  
    
  }
  data = JSON.parse(localStorage.getItem('407h')!)
  auth0! : Auth
}
