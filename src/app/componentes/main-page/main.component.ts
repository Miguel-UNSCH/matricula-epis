import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Services/user/user.service';

import { interval, Subscription } from 'rxjs';
import { UserI } from 'src/app/Interfaces/user/UserI';
import { Auth, User } from 'firebase/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  permitido! : boolean;
  //user datas
  datos = JSON.parse(localStorage.getItem('407h')!)
  auth0! : Auth  
  $User!  : any

  // items data
  itemName : string = localStorage.getItem("Item")!;

  constructor(private userSevice : UserService, private route : Router, private render : Renderer2){
    if(!this.itemName){
      this.itemName = "horarios"
    }
  }
  
  @ViewChild('items') Items! : ElementRef;

  btnActive(i: number, name: string) {
    // 0: Horarios
    // 1: Docentes
    // 2: Matricula
    // 3: Mis cursos
    // 4: Mis deudas
    // 5: Mis pagos
    // 6: Ajustes
    // 7: Usuario
    localStorage.setItem('Item', name)
    const ITEMS = this.Items.nativeElement
    const DOM = this.render

    for (let j = 0; j < 8; j++){
      if (ITEMS.children[j].className !== 'item'){
        DOM.removeClass(ITEMS.children[j], 'active')
      }
    }

    if (ITEMS.children[i].className === 'item'){
      DOM.addClass(ITEMS.children[i], 'active')
    }else if (ITEMS.children[i].className === 'item tooltip'){
      DOM.addClass(ITEMS.children[i], 'active')
      // console.log(ITEMS.children[i])
    }
  }

  UserExits(){
    if (this.datos){
      this.auth0 = this.datos.auth
      this.$User = this.auth0.currentUser
      //comprueba si hay un usuario y verifica el email para permitir el acceso
      if(this.$User){
        this.userSevice.VerificarUser(this.userSevice.VerifiedEmail(this.$User.email!))
        this.permitido = this.userSevice.esVerificado()
      }else{
        this.userSevice.logOut()
        this.route.navigate(['/login'])
      }
    }else{
      this.userSevice.logOut()
    }
    
  }



  ngOnInit() {
    this.UserExits(); 
    
    //ruta hija
    if(this.itemName == "horarios"){
      this.route.navigate(['/usuario/'])
    }else{
      this.route.navigate(['/usuario/' + this.itemName])
    }
    
    //timer seccion countdown
    
  }

  // DOM manipulation
  // ViewChilds
  @ViewChild('lateral') Lateral! : ElementRef;
  @ViewChild('showButton') ShowButton! : ElementRef;
  @ViewChild('container') container! : ElementRef;
  @ViewChild('vistaOpciones') VistaOpciones! : ElementRef;
  @ViewChild('userCont') UserCont! : ElementRef;
  
  ToogleIN = false;
  activeUserOptions = false;

  ngAfterViewInit(): void {
    if(this.permitido){
      //toogle for show and hide bar
      let TOOGLE = this.ToogleIN
    //DOM const

    // ----------------- Opciones de Usuario or vista telefono ------------
    let activeOpt = this.activeUserOptions

    const USER_CONT = this.UserCont.nativeElement // cont donde se ejecuta evento  
    const VISTA_OPCIONES = this.VistaOpciones.nativeElement // vista de opciones

    DOM.listen(USER_CONT, 'click', showHideOptions)
    DOM.listen(VISTA_OPCIONES, 'click', showHideOptions)

    function showHideOptions(){
      if (activeOpt) {
        VISTA_OPCIONES.style.display = 'none';
        activeOpt = false;
      }else{
        VISTA_OPCIONES.style.display = 'block';
        activeOpt = true;
      }
    }

    // ------------------- barra lateral --------------------------

    //toogle for show and hide bar

      //DOM const
      const DOM = this.render

      // Container element
      const CONTAINER = this.container.nativeElement

      //lateral const
      const LATERAL = this.Lateral.nativeElement

      const SHOW_BTN = this.ShowButton.nativeElement

      const ITEMS = this.Items.nativeElement

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
          // console.log(ITEMS.children[0])
          for (let j = 0; j < 8; j++){
            DOM.addClass(ITEMS.children[j], 'tooltip')
          }

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

          for (let j = 0; j < 8; j++){
            DOM.removeClass(ITEMS.children[j], 'tooltip')
          }
          // e.path[0].childNodes[0].className = 'fa-solid fa-chevron-left';
        }
        // console.log(e.path[0])
      }
    }
    
    
  }
}
