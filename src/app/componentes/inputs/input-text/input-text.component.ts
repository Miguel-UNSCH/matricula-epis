import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide :  NG_VALUE_ACCESSOR,
      useExisting : InputTextComponent,
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor,  AfterViewInit{
  constructor(private render : Renderer2){
  }


  @ViewChild("texto") input_text!: ElementRef;

  @Input() placeholderText?: string;
  @Input() IsRequired : boolean = false;
  @Input() IdName? : string;
  //inputgroup
  inputELEMENT! : HTMLDivElement;
  ngAfterViewInit(): void {
    this.inputELEMENT = this.input_text.nativeElement
    if(this.IsRequired){
      this.render.addClass(this.inputELEMENT, "requerido")
    }
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
