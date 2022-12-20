import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Services/user/user.service';

import { Observable } from 'rxjs';
import { UserI } from 'src/app/Interfaces/user/UserI';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  permitido! : boolean;

  //user datas
  $User : any = this.userSevice.afAuth.currentUser

  constructor(private userSevice : UserService, private route : Router, private render : Renderer2){
  }
  

  UserExits(){
    const USER = this.userSevice.getCurrentUser()
    function VerifiedEmail(email: any) : boolean {
      let verifiedText = ''
      let dominioEscuela = '27@unsch.edu.pe'

      if (email !== undefined){
        let activate = false
        for(let pos = 0; pos < email.length; pos++){
          if (email[pos] == '@'){
            activate = true
          }
          if (activate){
            verifiedText += email[pos]
          }
        }
      }
      return ('27' + verifiedText) == dominioEscuela
    }
    //compueba si hay un usuario
    if(USER){
      this.userSevice.VerificarUser(VerifiedEmail(USER.email))
      this.permitido = this.userSevice.esVerificado()
    }else{
      this.userSevice.logOut()
      this.route.navigate(['/login'])
      
    }
  }

  refresh(){
    let user = this.userSevice.getCurrentUser()
    let token = user?.refreshToken
    this.userSevice.refreskToken(token)
    .then(()=>{
      // console.log(this.userSevice.getCurrentUser())
    })
    .catch((error) => {
      console.log(error.message + "Error Refresch Token XDXDXXDX")
    })
  }


  ngOnInit() {
    this.refresh();
    this.UserExits();    
  }

  // DOM manipulation
  // ViewChilds
  @ViewChild('lateral') Lateral! : ElementRef;

  @ViewChild('showButton') ShowButton! : ElementRef;
  // @ViewChild('escuela') Escuela! : ElementRef;
  @ViewChild('container') container! : ElementRef;
  // ViewChilds end
  
  ToogleIN = false;

  ngAfterViewInit(): void {
    //toogle for show and hide bar
    let TOOGLE = this.ToogleIN

    //DOM const
    const DOM = this.render

    //lateral const
    const LATERAL = this.Lateral.nativeElement

    const SHOW_BTN = this.ShowButton.nativeElement

    const CONTAINER = this.container.nativeElement

    DOM.listen(SHOW_BTN, 'click', hideShowLateral)

    DOM.listen(LATERAL, 'mouseenter', enterLateral)
    DOM.listen(LATERAL, 'mouseleave', leaveLateral)

    //funcion for events
    function hideShowLateral (e: any){
      let element = e.path[0]
      e.preventDefault();
      e.stopPropagation()
      if(TOOGLE){
        DOM.addClass(LATERAL, 'hide')        
        DOM.removeClass(CONTAINER, 'lateral-active')
        TOOGLE = false;

        if(e.path[0].children[0]){
          element = e.path[0].children[0]
        }else{
          element = e.path[0]
        }
        // console.log(element)
        DOM.addClass(element, 'rotate-pointer')
        // DOM.removeClass(element, 'fa-chevron-left')
        // e.path[0].childNodes[0].className = 'fa-solid fa-chevron-right';
      }else{
        TOOGLE = true;
        DOM.removeClass(LATERAL, 'hide')
        DOM.addClass(CONTAINER, 'lateral-active')
        if(e.path[0].children[0]){
          element = e.path[0].children[0]
        }else{
          element = e.path[0]
        }
        // console.log(element)
        // DOM.addClass(element, 'fa-chevron-left')
        DOM.removeClass(element, 'rotate-pointer')
        // e.path[0].childNodes[0].className = 'fa-solid fa-chevron-left';
      }
      // console.log(e.path[0])
    }

    function enterLateral() {
      if(!TOOGLE){
        DOM.removeClass(LATERAL, 'hide')
      }
      
    }
    function leaveLateral(){
      if(!TOOGLE){
        DOM.addClass(LATERAL, 'hide')
      }
      
    }
    
  }
}
