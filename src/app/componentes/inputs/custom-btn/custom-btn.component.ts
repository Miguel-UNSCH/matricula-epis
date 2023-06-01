import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-btn',
  templateUrl: './custom-btn.component.html',
  styleUrls: ['./custom-btn.component.css'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomBtnComponent,
      multi: true
    }
  ]
})
export class CustomBtnComponent implements ControlValueAccessor {

  @Input() textBtn: string = 'Custom';
  @Input() iconClass: string = "fa-solid fa-check";
  @Input() funtionDefault : Function = () =>{
    console.log("testing...");
  }
  @Input() disabled : boolean = false;

  private onClicked! : Function; //funcion que escucha el click del boton actual

  Clicked($event : MouseEvent){ // esta funcion ejecuta la funcion que envia el padre
    this.funtionDefault($event)
  }

  //control value accessor
  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }

  registerOnTouched(fn: any): void { // este realiza el register onTouched para el value accessor
      this.onClicked = fn;
  }

}
