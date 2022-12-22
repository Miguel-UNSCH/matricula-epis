import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import datos from '../../../assets/data/datos.json';
import { CURSOS } from 'src/app/Interfaces/curso/cursos';
import Swal from 'sweetalert2'; // alertas

import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
})
export class MatriculaComponent implements OnInit {
  Cursos: CURSOS[] = datos;
  CursosAgregados: CURSOS[] = []; // aqui se guardan los cursos agregados
  constructor(private render: Renderer2) 
  {
    localStorage.setItem('curso', JSON.stringify(this.CursosAgregados));
  }

  agregar(dato: any) {
    const result = this.CursosAgregados.find((curso) => curso.id === dato.id);
    if (result) {
      Swal.fire({
        position: 'bottom-end',
        color: 'white',
        title: 'Error',
        text: 'Ya agregaste el curso',
        background: '#404040',
        icon: 'error',
        showConfirmButton: false,
        toast: true,
        timer: 2000,
      });
    } else {
      this.CursosAgregados.push(dato);
      Swal.fire({
        position: 'bottom-end',
        color: 'white',
        title: 'Listo!',
        text: 'Curso agregado',
        background: '#404040',
        icon: 'success',
        showConfirmButton: false,
        toast: true,
        timer: 2000,
      });
    }
    localStorage.removeItem('curso');
    localStorage.setItem('curso', JSON.stringify(this.CursosAgregados));
  }

  remover(dato: any) {
    Swal.fire({
      color: 'white',
      title: '¿Estás seguro de borrar el curso?',
      background: '#404040',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#FFC736',
      cancelButtonColor: '#F27474',
      focusCancel: false,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const filter = this.CursosAgregados.filter(
          (curso) => curso.id !== dato.id
        );
        this.CursosAgregados = filter;
        localStorage.removeItem('curso');
        localStorage.setItem('curso', JSON.stringify(this.CursosAgregados));
      }
    });
  }

  generarMatricula() {
    Swal.fire({
      color: 'white',
      title: '¿Estás seguro de esto?',
      text: 'No podrás revertir esto',
      background: '#404040',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, continuar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#FFC736',
      cancelButtonColor: '#F27474',
      focusCancel: false,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed && this.CursosAgregados.length > 0) {
        this.abrirVistaEsquela();
      }
      else if (result.isConfirmed && this.CursosAgregados.length === 0) {
        Swal.fire({
          position: 'bottom-end',
          color: 'white',
          title: 'Error',
          text: 'No agregaste ningún curso',
          background: '#404040',
          icon: 'error',
          showConfirmButton: false,
          toast: true,
          timer: 2000,
        })
      }
    });
  }

  // Abrir y cerrar vista esquela
  @ViewChild('esquela') Esquela!: ElementRef;
  abrirVistaEsquela() {
    const ESQUELA = this.Esquela.nativeElement;
    const DOM = this.render;

    if (ESQUELA.className === 'esquela') {
      DOM.addClass(ESQUELA, 'esquela-viewer-container');
      this.generarPdf();
    }
  }
  cerrarVistaEsquela() {
    const ESQUELA = this.Esquela.nativeElement;
    const DOM = this.render;

    if (ESQUELA.className !== 'esquela') {
      DOM.removeClass(ESQUELA, 'esquela-viewer-container');
    }
  }

  @ViewChild('esquelaView') EsquelaView!: ElementRef;
  pdfElement = this.render.createElement('iframe');

  generarPdf() {
    const ESQUELAVIEW = this.EsquelaView.nativeElement;

    const docDefinition: any = {
      header: 'Esquela de pago',
      
      content: [
        {
          text: 'Hola mundo',
        },
      ],

      footer: {
        text: 'footer',
      }
    };
    const pdf = pdfMake.createPdf(docDefinition);
    pdf.getBlob((blob) => {
      let url = URL.createObjectURL(blob);
      this.render.appendChild(ESQUELAVIEW, this.pdfElement);
      this.render.setAttribute(this.pdfElement, 'src', url);
    });
  }

  ngOnInit(): void {
    let cursosRecuperados = localStorage.getItem('curso');
    this.CursosAgregados = JSON.parse(cursosRecuperados!);
  }
}
