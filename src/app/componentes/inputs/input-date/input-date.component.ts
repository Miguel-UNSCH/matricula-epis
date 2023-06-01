import { Component, Input, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css']
})
export class InputDateComponent implements ControlValueAccessor, AfterViewInit{
  constructor(private render2 : Renderer2) {  }
  @Input() IdName! : string;
  @Input() placeholderText! : string;
  @Input() IsRequired : boolean = false;

  //viewchild
  @ViewChild("fecha") inputDate!: ElementRef;
  inputElement!:HTMLInputElement
  ngAfterViewInit(): void {
      this.inputElement = this.inputDate.nativeElement;
  }
  //control accesor value
  contenido = "";
  private onChangefn!: Function;
  changeValue($event : any){
    let valor : string = $event.target.value.toString(); //establecemos el value del tag del input
    if(valor.length > 0){
      this.render2.addClass(this.inputElement, "correct")
    }else{
      this.render2.removeClass(this.inputElement, "correct")
    }
    this.onChangefn(valor)
  }
  writeValue(value : string): void {
    this.contenido = value
  }
  registerOnChange(fn: any): void {
      this.onChangefn = fn
  }
  registerOnTouched(fn: any): void {
    // this.onChangefn= fn
  }
}
