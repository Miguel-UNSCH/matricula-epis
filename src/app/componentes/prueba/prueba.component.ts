import { AfterViewInit, Component, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'soy-un-selector',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})

export class PruebaComponent implements AfterViewInit{
  constructor(private render : Renderer2){

  }

  @ViewChild('loca') loca! : ElementRef;

  ngAfterViewInit(): void {
    const DOM = this.render
    function renders(){
      DOM.addClass(INPUT, 'estilo');
    }

    function leave(){
      DOM.removeClass(INPUT, 'estilo'); 
    }

    const INPUT = this.loca.nativeElement
    INPUT.style.color = 'red';

    // INPUT.addEventListener('mouseenter', renders)
    this.render.listen(INPUT, 'mouseenter', renders)
    this.render.listen(INPUT, 'mouseleave', leave)
    
  }
}