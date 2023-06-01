import { Component, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-hour',
  templateUrl: './input-hour.component.html',
  styleUrls: ['./input-hour.component.css']
})
export class InputHourComponent implements ControlValueAccessor, AfterViewInit{
  constructor(private render2: Renderer2){ }

  IdName = "xd"
  placeholderText = "hora"
  IsRequired = true

  //control value Accesor
  private onChangefn_! : Function;
  content = "";

  writeValue(value: string): void {
    this.content = value;
  }
  registerOnChange(fn: any): void {
      this.onChangefn_ = fn;
  }
  registerOnTouched(fn: any): void {

  }

  cambioHora($event: any){
    let valor : string = $event.target.value.toString()
    if(valor.length > 0){
      this.render2.addClass(this.TimeElement, "correcto")
    }else{
      this.render2.removeClass(this.TimeElement, "correcto")
    }
    this.onChangefn_($event.target.value)
  }
  //control del DOM
  @ViewChild("time") TimeInput! : ElementRef
  private TimeElement! : HTMLInputElement;
  ngAfterViewInit(): void {
    this.TimeElement = this.TimeInput.nativeElement;
  }
}
