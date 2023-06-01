import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Services/user/user.service';

import { interval, Subscriber, Subscription } from 'rxjs';
import { UserI } from 'src/app/Interfaces/user/UserI';
import { Auth, User } from 'firebase/auth';

import { ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2';
import { toggleFullscreen } from 'src/app/Interfaces/fullscreen';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  permitido! : boolean;
  needUpdate : boolean = this.userSevice.UserNeedUpdate();

  closeSesion : boolean = false;

  CerrarSesion(){
    this.closeSesion = true;
    setTimeout(() => {
      this.userSevice.logOut()
    }, 1500);
  }
  //user datas
  datos = JSON.parse(localStorage.getItem('407h')!)
  auth0! : Auth
  $User!  : any

  // items data
  itemName : string = localStorage.getItem("Item")!;

  constructor(private userSevice : UserService, private route : Router, private render : Renderer2, private Activatedroute : ActivatedRoute){
    if(!this.itemName){
      this.itemName = "horarios"
    }
    // recibe la señal eviada por query params para  cambiar de color al item de deuda
    this.Activatedroute.queryParams.subscribe(params =>{
      if (params["ItemName"] != undefined){
        try {
          this.btnActive(4, 'deudas')
        } catch (error) {

        };
      }
    });
  }

  @ViewChild('items') Items! : ElementRef;

  public btnActive(i: number, name: string) {
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
      this.permitido = true// this.userSevice.esVerificado()
    }else{
      this.userSevice.logOut()
     this.route.navigate(['/login'])
    }
    }else{
      this.userSevice.logOut()
    }
  }

  private timer! : Subscription;

  alerta = Swal.mixin({
    toast: true,
    timer: 2500,
    showConfirmButton: false,
    position: 'center',
  })

  date = new Date();
  duration = 1800000
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference: any = this.duration;
  public secondsToDday : any;
  public minutesToDday : any;
  public hoursToDday : any;
  public daysToDday : any;

  private getTimeDifference () {
    this.timeDifference -=  1000
    this.allocateTimeUnits(this.timeDifference);
  }
  private allocateTimeUnits (timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }



  ngOnInit() {
    // Swal.fire({
    //   title : "FullScreen",
    //   text: "¿Desea activar la pantalla completa?",
    //   showCancelButton: true,
    //   showConfirmButton: true,
    //   confirmButtonText: "Activar",
    //   cancelButtonText: "No, cancelar",
    //   confirmButtonColor: "green",
    //   cancelButtonColor: "red"
    // }).then((result)=>{
    //   if(result.isConfirmed){
    //     toggleFullscreen()
    //     localStorage.setItem("full", '{"active": true}')
    //   }
    // })

    this.UserExits();

    //ruta hija
    if(this.itemName == "horarios"){
      this.route.navigate(['/usuario/horario'])
    }else{
      this.route.navigate(['/usuario/' + this.itemName])
    }

    //timer seccion countdown for logOut
    this.timer = interval(this.milliSecondsInASecond)
    .subscribe( x => {
      this.getTimeDifference();
      if(this.minutesToDday == 0 && this.secondsToDday == 0){
        this.userSevice.logOut();
        this.alerta.fire({
          icon: 'warning',
          text: 'Tiempo de inicio de sesión agotado',
          timer: 3500,
          toast: true
        })
      }
    })
    //cambios en el parametro de la url
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe()
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
      const DOM = this.render

       // ----------------- Opciones de Usuario or vista telefono ------------
       let activeOpt = this.activeUserOptions

      // Container element
      const CONTAINER = this.container.nativeElement

      //lateral const
      const LATERAL = this.Lateral.nativeElement

      const SHOW_BTN = this.ShowButton.nativeElement

      const ITEMS = this.Items.nativeElement

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

    DOM.listen(SHOW_BTN, 'click', hideShowLateral)

    //funcion for events
    function hideShowLateral (e: any){
      let element = e.target
      // console.log(element);
      try {
        element = e.path[0]
        console.log(element);
      } catch (error) {

      }


      e.preventDefault();
      e.stopPropagation()
      //si esta extendido la barra, lo contrae
      if(TOOGLE){
        DOM.addClass(LATERAL, 'hide')
        DOM.removeClass(CONTAINER, 'lateral-active')
        TOOGLE = false;
        // console.log(ITEMS.children[0])
        for (let j = 0; j < 8; j++){
          DOM.addClass(ITEMS.children[j], 'tooltip')
          console.log(ITEMS.children[j])

          DOM.addClass(ITEMS.children[j].children[1], "hide-tooltip")
        }

        // if(e.path[0].children[0]){
        //   element = e.path[0].children[0]
        // }else{
        //   element = e.path[0]
        // }
        // console.log(element)
        DOM.removeClass(element, 'rotate-pointer')
        // DOM.removeClass(element, 'fa-chevron-left')
        // e.path[0].childNodes[0].className = 'fa-solid fa-chevron-right';
      }else{ //si esta contraido la barra, lo extiende
        DOM.removeClass(LATERAL, 'hide')
        DOM.addClass(CONTAINER, 'lateral-active')
        // if(e.path[0].children[0]){
        //   // element = e.path[0].children[0]
        // }else{
        //   element = e.path[0]
        // }
        // console.log(element)
        // DOM.addClass(element, 'fa-chevron-left')
        DOM.addClass(element, 'rotate-pointer')
        TOOGLE = true;

          for (let j = 0; j < 8; j++){
            DOM.removeClass(ITEMS.children[j], 'tooltip')
            console.log(ITEMS.children[j].children[1])
          }
        // e.path[0].childNodes[0].className = 'fa-solid fa-chevron-left';
      }
      // console.log(e.path[0])
    }

    }
  }
}
