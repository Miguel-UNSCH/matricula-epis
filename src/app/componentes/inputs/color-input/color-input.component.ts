import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.css'],
  providers: [
    {
      provide : NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ColorInputComponent
    }
  ]
})
export class ColorInputComponent implements AfterViewInit, ControlValueAccessor{
  constructor(private render : Renderer2){

  }

  @Input() placeholderText?: string;
  @Input() IsRequired : boolean = false;
  @Input() IdName? : string;
  //inputgroup
  @ViewChild("muestrario") muestrario! : ElementRef;
  @ViewChild("colorname") colorname! : ElementRef;

  //atributos por defecto
  @Input() colorDefault : string = "#2e3644" //color por defecto

  //manejo de eventos del color
  ngAfterViewInit(): void {
    const RENDER = this.render // render asignado a una constante local
    const inputcolor = this.muestrario.nativeElement;
    this.render.setAttribute(inputcolor, "value", this.colorDefault)
    this.render.listen(inputcolor, "input", startup)

    const COLORNAME = this.colorname.nativeElement;
    this.render.setAttribute(COLORNAME, "value", this.colorDefault)

    function startup(){ //funcion para cambiar el valor visual del color
      RENDER.setAttribute(COLORNAME, "value", inputcolor.value)
    }
  }

  //control value accesor metods
  private onChange! : Function;

  changeColor($event: any){
    this.onChange($event.target.value)
  }

  content = ""

  writeValue(value : string): void {
    this.content = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }


}
