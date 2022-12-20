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
  
  @ViewChild('items') Items! : ElementRef;
  btnActive(i: number) {
    // 0: Horarios
    // 1: Docentes
    // 2: Matricula
    // 3: Mis cursos
    // 4: Mis deudas
    // 5: Mis pagos
    // 6: Ajustes
    // 7: Usuario
    const ITEMS = this.Items.nativeElement
    const DOM = this.render

    for (let j = 0; j < 8; j++){
      if (ITEMS.children[j].className !== 'item'){
        DOM.removeClass(ITEMS.children[j], 'active')
      }
    }

    if (ITEMS.children[i].className === 'item'){
      DOM.addClass(ITEMS.children[i], 'active')
    }
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
            verifiedText += email[pos-2] + email[pos-1]
            activate = true
          }
          if (activate){
            verifiedText += email[pos]
          }
        }
      }
      return verifiedText == dominioEscuela
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
  @ViewChild('container') container! : ElementRef;
  
  ToogleIN = false;

  ngAfterViewInit(): void {
    //toogle for show and hide bar
    let TOOGLE = this.ToogleIN

    //DOM const
    const DOM = this.render

    // Container element
    const CONTAINER = this.container.nativeElement

    //lateral const
    const LATERAL = this.Lateral.nativeElement

    const SHOW_BTN = this.ShowButton.nativeElement

    DOM.listen(SHOW_BTN, 'click', hideShowLateral)

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
        DOM.removeClass(element, 'rotate-pointer')
        // DOM.removeClass(element, 'fa-chevron-left')
        // e.path[0].childNodes[0].className = 'fa-solid fa-chevron-right';
      }else{
        DOM.removeClass(LATERAL, 'hide')
        DOM.addClass(CONTAINER, 'lateral-active')
        if(e.path[0].children[0]){
          element = e.path[0].children[0]
        }else{
          element = e.path[0]
        }
        // console.log(element)
        // DOM.addClass(element, 'fa-chevron-left')
        DOM.addClass(element, 'rotate-pointer')
        TOOGLE = true;
        // e.path[0].childNodes[0].className = 'fa-solid fa-chevron-left';
      }
      // console.log(e.path[0])
    }
    
  }
}
