import { Component, ElementRef, HostListener, Input, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css']
})
export class UpdateUserDataComponent implements OnInit{

  
  
  constructor(private elRef: ElementRef, private render: Renderer2) { }

  @Input() userProfile :any;

  USERNAME : any;

  @HostListener('animationend', ['$event'])
  onAnimationEnd(event: AnimationEvent) {
    const spanElement = event.target
    this.render.addClass(spanElement, "seleccion")
    setTimeout(() => {
      this.render.removeClass(spanElement, "seleccion")
      setTimeout(()=>{
        this.render.removeClass(spanElement, "animate-text")
        setTimeout(() => {
          this.render.addClass(spanElement, "animate-text")
        }, 50)
        
      }, 400)      
    }, 500)

  }

  ngOnInit(){
    const USER = JSON.parse(localStorage.getItem("407h")!)
    if (USER){
      let nombre = String(USER.currentUser.displayName)
      if (nombre.length > 20){
        this.USERNAME = nombre.substring(0, 20) + "..."
        
      }else{
        this.USERNAME = nombre
      }
    }
  }

  //recurso para el modal
  showModal = false;
  title = 'Informacíon requerida';

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  //
  updateDatos(){
    console.log("updateDatos")
  }
}
