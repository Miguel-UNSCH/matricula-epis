import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectContent } from 'src/app/Interfaces/select-input/select-input';

@Component({
  selector: 'app-input-select',
  templateUrl: './inpu-select.component.html',
  styleUrls: ['./inpu-select.component.css'],
  providers: [
    {
      provide : NG_VALUE_ACCESSOR,
      useExisting : InpuSelectComponent,
      multi: true
    }
  ]
})
export class InpuSelectComponent implements ControlValueAccessor, AfterViewInit {
  //constructor
  constructor(private render2: Renderer2){}

  @Input() placeholderText?: string;
  @Input() IsRequired : boolean = false;
  @Input() IdName? : string;

  @Input() defValue : string = "Selecione una opción";

  @Input() ListContent! : SelectContent[];

  //controlar vista
  @ViewChild("select") Select!:ElementRef;
  SelectElement! : HTMLDivElement

  ngAfterViewInit(): void {
      this.SelectElement = this.Select.nativeElement;
      if(this.IsRequired){
        this.render2.addClass(this.SelectElement, "requerido")
      }
  }

  private onChangefn_! : Function;

  changeText($event : any){
    let valor = $event.target.value.toString()
    this.onChangefn_($event.target.value);
    this.content = valor
    if(valor.length > 0){
      this.render2.addClass(this.SelectElement, "correcto")
    }else{
      this.render2.removeClass(this.SelectElement, "correcto")
    }
  }

  content = ""

  //control value accesor metodos
  writeValue(value : string): void {
      this.content = value;
  }

  registerOnTouched(fn: any): void {

  }

  registerOnChange(fn: any): void {
      this.onChangefn_ = fn;
  }



}
