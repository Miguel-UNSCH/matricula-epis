import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import datos from '../../../assets/data/datos.json';
import { CURSOS } from 'src/app/Interfaces/curso/cursos';
import Swal from 'sweetalert2'; // alertas

import { UserService } from 'src/app/Services/user/user.service';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { LOGO_SISTEMAS, LOGO_UNSCH } from 'src/app/Interfaces/imgbase64/imgbase64';
import { Router } from '@angular/router';


@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css',],
})
export class MatriculaComponent implements OnInit {


  Cursos: CURSOS[] = datos;
  CursosAgregados: CURSOS[] = []; // aqui se guardan los cursos agregados

  constructor(private userSevice: UserService, private render: Renderer2, private route : Router) {
    if (
      localStorage.getItem('curso') !== undefined &&
      localStorage.getItem('curso')
    ) {
      // console.log('existe')
    } else {
      // console.log('noExiste')
      localStorage.setItem('curso', JSON.stringify(this.CursosAgregados));
    }
  }

  cambiarDeudas(){
    //envia señal por query params al padre para cabiar el estilo
    localStorage.setItem('Item', "deudas");
    const data = {"ItemName": "deudas"};
    this.route.navigate(['/usuario/deudas'], { queryParams: data})
  }

  agregar(dato: any) {
    if(localStorage.getItem('curso') == null){
      localStorage.setItem('curso', JSON.stringify(this.CursosAgregados));
    }
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
  EsMatriculado : boolean = false;
  generarMatricula() {
    if(this.CursosAgregados.length > 0){
      if(this.EsMatriculado){

      }else{
        Swal.fire({
          color: 'white',
            title: '¿Está seguro de generar su matricula?',
          text: 'No podrás revertir esto',
          background: '#404040',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '¡Sí, continuar!',
            cancelButtonText: 'No, cancelar',
          confirmButtonColor: '#FFC736',
          cancelButtonColor: '#F27474',
          focusCancel: false,
          focusConfirm: false,
        }).then((result) => {
            if (result.isConfirmed) {
            this.abrirVistaEsquela();
            }
            else if (result.isConfirmed) {
              
            }
          });
        }
      
    }else{
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
  }
    
  desMatricula(){
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
        this.descargarPdf();
      } else if (result.isConfirmed && this.CursosAgregados.length === 0) {
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
        });
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
      this.abrirPdf();
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
    const USER =  JSON.parse(localStorage.getItem('407h')!).currentUser    //this.userSevice.afAuth.currentUser;

    const usuario = {
      nombres: USER?.displayName || "USERNAME",
      apellidos: '',
      código: '27200103',
      cursos: [],
      semestre: '2022-i',
      deuda: 35.5,
      totalPagar: 55.5,
    };

    function toCapitalize(string: any) {
      return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter: any) =>
        letter.toUpperCase()
      );
    }

    const cursos = this.CursosAgregados;

    const cursosMat = [
      [
        {
          text: 'CÓDIGO',
          alignment: 'center',
          fontSize: 10,
          fillColor: '#a2a2a2',
          margin: [0, 4, 0, 4],
        },
        {
          text: 'ASIGNATURA',
          alignment: 'center',
          fontSize: 10,
          fillColor: '#a2a2a2',
          margin: [0, 4, 0, 4],
        },
        {
          text: 'DOCENTE',
          alignment: 'center',
          fontSize: 10,
          fillColor: '#a2a2a2',
          margin: [0, 4, 0, 4],
        },
      ],
    ];

    cursos.forEach((curso) => {
      cursosMat.push([
        {
          text: curso.asignatura.codigo.toUpperCase(),
          alignment: 'center',
          fontSize: 10,
          fillColor: '#e2e2e2',
          margin: [0, 4, 0, 4],
        },
        {
          text: toCapitalize(curso.asignatura.nombre),
          alignment: 'left',
          fontSize: 10,
          fillColor: '#e2e2e2',
          margin: [0, 4, 0, 4],
        },
        {
          text: toCapitalize(
            curso.docente.nombres + ' ' + curso.docente.apellidos
          ),
          alignment: 'left',
          fontSize: 10,
          fillColor: '#e2e2e2',
          margin: [0, 4, 0, 4],
        },
      ]);
    });

    const dias = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const meses = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Oct',
      'Nov',
      'Dic',
    ];

    const hoy = new Date();
    const fecha = hoy.toLocaleDateString();
    let hora = hoy.getHours() > 12 ? hoy.getHours()%12 : hoy.getHours()
    let minutos = hoy.getMinutes() < 10 ? '0' + hoy.getMinutes() : hoy.getMinutes()
    let segundos = hoy.getSeconds() < 10 ? '0' + hoy.getSeconds() : hoy.getSeconds()
    let am_pm = hoy.getHours() > 12 ? 'PM' : 'AM'
    const fechaYHora =
      dias[hoy.getDay()] +
      ', ' +
      hoy.getDate() +
      ' de ' +
      meses[hoy.getMonth()] +
      ' del ' +
      hoy.getFullYear() +
      ' - ' +
      (((hora) < 10 ? '0' + hora : hora) == 0 ? '12' : ((hora) < 10 ? '0' + hora : hora))+
      ':' +
      minutos +
      ':' +
      segundos +
      ' ' + 
      am_pm;

    const docDefinition = {
      info: {
        title: USER?.displayName || "USERNAME",
        author: 'Franklin Figueroa Perez',
        subject: 'pago',
        keywords: 'esquela, proforma',
        creationDate: new Date(),
        },
      content: [
        {
          layout: 'noBorders',
          table: {
            widths: ['auto', '*', 'auto'],
            heights: [10, 30],
            body: [
              [
                {
                  image:
                    LOGO_UNSCH,
                  width: 70,
                  rowSpan: 2,
                  alignment: 'center',
                },
                '',
                {
                  image:
                    LOGO_SISTEMAS,
                  width: 50,
                  rowSpan: 2,
                  alignment: 'center',
                  margin: [0, 10, 0, 0],
                },
              ],
              [
                {},
                {
                  text: 'UNIVERSIDAD NACIONAL DE SAN CRISTOBAL DE \nHUAMANGA\nESCUELA PROFESIONAL DE INGENIERIA DE SISTEMAS',
                  alignment: 'center',
                  bold: true,
                  fontSize: 12,
                },
                {},
              ],
            ],
          },
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['*'],
            body: [[{ text: '' }], ['']],
          },
        },
        {
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'ESQUELA DE PAGO',
                  alignment: 'center',
                  fontSize: 12,
                  margin: [0, 10, 0, 20],
                },
              ],
            ],
          },
        },
        {
          layout: 'noBorders',
          table: {
            widths: ['auto', 'auto', '*', 'auto', 'auto', 'auto'],
            body: [
              [
                {
                  text: 'NOMBRES:',
                  alignment: 'left',
                  fontSize: 9,
                  bold: true,
                  margin: [0, 2, 0, 10],
                },
                {
                  text:
                    usuario.nombres!.toUpperCase() +
                    ' ' +
                    usuario.apellidos.toUpperCase(),
                  alignment: 'left',
                  fontSize: 9,
                  margin: [0, 2, 0, 10],
                },
                {},
                {},
                {
                  text: 'CÓDIGO DE ESTUDIANTE:',
                  alignment: 'left',
                  fontSize: 9,
                  bold: true,
                  margin: [0, 2, 0, 10],
                },
                {
                  text: usuario.código ,
                  alignment: 'right',
                  fontSize: 9,
                  margin: [0, 2, 0, 10],
                },
              ],
              [
                {
                  text: 'ESCUELA:',
                  alignment: 'left',
                  fontSize: 9,
                  bold: true,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: 'INGENIERIA DE SISTEMAS',
                  alignment: 'left',
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: 'SEMESTRE:',
                  alignment: 'right',
                  fontSize: 9,
                  bold: true,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: usuario.semestre.toUpperCase(),
                  alignment: 'left',
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: 'FECHA:',
                  alignment: 'right',
                  fontSize: 9,
                  bold: true,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: fecha,
                  alignment: 'right',
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {
                  text: 'ASIGNATURAS REGISTRADAS:',
                  alignment: 'left',
                  fontSize: 10,
                  colSpan: 2,
                  margin: [0, 20, 0, 2],
                },
                {},
                {},
                {},
                {},
                {},
              ],
            ],
          },
        },
        {
          layout: 'noBorders',
          table: {
            widths: [60, '*', 150],
            body: cursosMat,
          },
        },
        {
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'PAGO DE MATRÍCULA:',
                  alignment: 'left',
                  fontSize: 10,
                  margin: [0, 30, 0, 0],
                }
              ]
            ]
          }
        },
        {
          layout: 'noBorders',
          table: {
              widths: ['*', 150],
              body: [
                  [
                      {
                          text: 'DESCRIPCIÓN',
                          alignment: 'center',
                          fontSize: 10,
                          fillColor: '#a2a2a2',
                          margin: [0, 4, 0, 4]
                      },
                      {
                          text: 'COSTO',
                          alignment: 'center',
                          fontSize: 10,
                          fillColor: '#a2a2a2',
                          margin: [0, 4, 0, 4]
                      }
                  ],
                  [
                      {
                          text: 'MATRÍCULA REGULAR',
                          alignment: 'left',
                          fontSize: 10,
                          fillColor: '#e2e2e2',
                          margin: [4, 4, 0, 4]
                      },
                      {
                          text: 'S/. 5.00',
                          alignment: 'right',
                          fontSize: 10,
                          fillColor: '#e2e2e2',
                          margin: [0, 4, 4, 4]
                      }
                  ],
                  [
                      {
                          text: 'DERECHO DE CENTRO DE ESTUDIANTES',
                          alignment: 'left',
                          fontSize: 10,
                          fillColor: '#e2e2e2',
                          margin: [4, 4, 0, 4]
                      },
                      {
                          text: 'S/. 10.00',
                          alignment: 'right',
                          fontSize: 10,
                          fillColor: '#e2e2e2',
                          margin: [0, 4, 4, 4]
                      }
                  ],
                  [
                      {
                          text: 'DEUDA PERSONAL',
                          alignment: 'left',
                          fontSize: 10,
                          fillColor: '#e2e2e2',
                          margin: [4, 4, 0, 4]
                      },
                      {
                          text: 'S/. ' + usuario.deuda,
                          alignment: 'right',
                          fontSize: 10,
                          fillColor: '#e2e2e2',
                          margin: [0, 4, 4, 4]
                      }
                  ],
                  [
                      {
                          text: 'MONTO TOTAL A PAGAR:',
                          alignment: 'right',
                          fontSize: 10,
                          bold: true,
                          fillColor: '#e2e2e2',
                          margin: [4, 4, 0, 4]
                      },
                      {
                          text: 'S/. ' + usuario.totalPagar,
                          alignment: 'right',
                          fontSize: 10,
                          bold: true,
                          fillColor: '#e2e2e2',
                          margin: [0, 4, 4, 4]
                      }
                  ]
              ]
          }
        
        
        },
        {
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: '',
                  margin: [0, 50, 0, 0],
                }
              ]
            ]
          }
        },
        {
          layout: "noBorders",
          table: {
              widths: ["*"],
              body: [
                  [
                      {
                          alignment: 'justify',
                          text: [
                              {
                                  text: "Importante: ",
                                  color: "red",
                                  bold: true,
                                  fontSize: 9
                              },
                              {
                                  text: "Realizar el pago a través de las cuentas asignadas para el cobro en el sistema",
                                  fontSize: 9,
                              },
                              {
                                  text: " SIMA-LAB ",
                                  color: "#FFC736",
                                  bold: true,
                                  fontSize: 9,
                              },
                              {
                                  text: "en un plazo de 24 horas a partir del momento de matrícula, además deberá subir el váucher de su pago al sistema",
                                  fontSize: 9,
                              },
                              {
                                  text: " SIMA-LAB ",
                                  color: "#FFC736",
                                  bold: true,
                                  fontSize: 9,
                              },
                              {
                                  text: " en formato de imagen, esto también, en un plazo de 24 horas.\n",
                                  fontSize: 9,
                              },
                              {
                                  text: "\nEl váucher de pago será verificado minuciosamente, se si encuentra algún tipo de fraude, lamentablemente su inscripción será anulada.\n",
                                  fontSize: 9,
                              },
                              {
                                  text: "\n" + fechaYHora,
                                  fontSize: 8,
                                  bold: true,
                                  alignment: "right",
                              },
                          ]
                      }
                  ],
              ],
          },
        }
      ]
    }
    
    const pdf = pdfMake.createPdf(docDefinition);
    return pdf
  }

  

  abrirPdf(){
    const ESQUELAVIEW = this.EsquelaView.nativeElement;
    const pdf = this.generarPdf()
    pdf.getBlob((blob) => {
      let url = URL.createObjectURL(blob);
      this.render.appendChild(ESQUELAVIEW, this.pdfElement);
      this.render.setAttribute(this.pdfElement, 'src', url);
    });
  }

  descargarPdf(){
    const USER = this.userSevice.afAuth.currentUser?.displayName;
    const pdf = this.generarPdf()
    pdf.download(USER!+'_ORDEN_PAGO')
  }

  ngOnInit(): void {
    let cursosRecuperados = localStorage.getItem('curso');
    this.CursosAgregados = JSON.parse(cursosRecuperados!);

    //enviar evento de clase al iniciar
  }
}