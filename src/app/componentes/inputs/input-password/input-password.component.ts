import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css'],
  providers: [
    {
      provide :  NG_VALUE_ACCESSOR,
      useExisting : InputPasswordComponent,
      multi: true
    }
  ]
})
export class InputPasswordComponent implements ControlValueAccessor,  AfterViewInit{
  constructor(private render : Renderer2){
  }


  @ViewChild("input_pwd") input_pwd!:ElementRef;
  @ViewChild("eye_icon") eyes! : ElementRef;

  @Input() placeholderText?: string;
  @Input() IsRequired : boolean = false;
  @Input() IdName? : string;
  //inputgroup
  inputELEMENT! : HTMLDivElement;
  ngAfterViewInit(): void {
    const DOM = this.render;
    const INPUT = this.input_pwd.nativeElement;
    const EYE = this.eyes.nativeElement;
    DOM.listen(EYE, "click", ()=>{
      if(EYE.children[0].className === "fa-solid fa-eye"){
        DOM.setAttribute(INPUT, "type", "text")
        DOM.removeClass(EYE.children[0], "fa-eye")
        DOM.addClass(EYE.children[0], "fa-eye-slash")
      }else{
        DOM.setAttribute(INPUT, "type", "password")
        DOM.removeClass(EYE.children[0], "fa-eye-slash")
        DOM.addClass(EYE.children[0], "fa-eye")
      }
    }, )

  }

  content = ""

  private onChangefn_! : Function;

  changeText($event : any){
    let valor = $event.target.value.toString()
    this.onChangefn_($event.target.value)
    if(valor.length > 0){
      this.render.addClass(this.inputELEMENT, "correcto")
    }else{
      this.render.removeClass(this.inputELEMENT, "correcto")
    }
  }

  // fn(){

  //
  // }
  //control value accessor
  writeValue(value : string): void {
      this.content = value;
  }

  registerOnTouched(fn: any): void {
      // this.onChangefn = fn
  }

  registerOnChange(fn: any): void {
      this.onChangefn_ = fn;
  }

  isDisabled! : boolean;

  setDisabledState(Disabled: boolean): void {
      this.isDisabled = Disabled
  }

}
