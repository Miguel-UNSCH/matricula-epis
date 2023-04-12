import {Component, ViewChild, Renderer2, ElementRef} from '@angular/core';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})

export class DeudasComponent{
  deudas: object[] = [
    {
      numero: 1,
      motivo: 'reunión general',
      fechaDeOcurrencia: '23/12/22 17:00 - 19:00',
      estado: true,
      monto: 0 
    },
    {
      numero: 2,
      motivo: 'toma de local',
      fechaDeOcurrencia: '23/12/22 17:00 - 19:00',
      estado: false,
      monto: 30 
    },
    {
      numero: 3,
      motivo: 'reunión de serie',
      fechaDeOcurrencia: '23/12/22 17:00 - 19:00',
      estado: true,
      monto: 40 
    },
    {
      numero: 4,
      motivo: 'reunión general',
      fechaDeOcurrencia: '23/12/22 17:00 - 19:00',
      estado: false,
      monto: 10 
    },
    {
      numero: 5,
      motivo: 'reunión general',
      fechaDeOcurrencia: '23/12/22 17:00 - 19:00',
      estado: false,
      monto: 5 
    },
    {
      numero: 6,
      motivo: 'reunión general',
      fechaDeOcurrencia: '23/12/22 17:00 - 19:00',
      estado: true,
      monto: 20 
    },
    {
      numero: 7,
      motivo: 'reunión general',
      fechaDeOcurrencia: '23/12/22 17:00 - 19:00',
      estado: true,
      monto: 20 
    }
  ]

  detalleDeuda = {
    numero: 1,
    motivo: 'reunión general',
    fechaDeOcurrencia: '23/12/22 17:00 - 19:00',
    estado: true,
    monto: 20 
  };

  @ViewChild('modalContainer') modalContainer !: ElementRef;

  abrirDetalle(deuda:any){
    this.detalleDeuda = deuda
    const MODAL = this.modalContainer.nativeElement
    const DOM = this.render
    DOM.setStyle(MODAL, 'display', 'flex')
  }

  cerrarDetalle(){
    const MODAL = this.modalContainer.nativeElement
    const DOM = this.render
    DOM.setStyle(MODAL, 'display', 'none')
  }

  constructor(private render: Renderer2){}
}
