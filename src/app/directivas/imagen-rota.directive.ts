import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
//esta directiva cambia la imagen por una predeterminad si detecta un error en ella
@Directive({
  selector: '[appImagenRota]'
})
export class ImagenRotaDirective{

  constructor(private elementRef: ElementRef) { }
  @Input() srcCustom! : string;

  @HostListener("error")
  cargarImagenPorDefecto(){
    const imgElement = this.elementRef.nativeElement
    imgElement.src = this.srcCustom || "../../assets/img/noImage.jpg"
  }
}

