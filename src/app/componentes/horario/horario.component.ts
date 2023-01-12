import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent {
  dias: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  horas: number[] = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  horarios: any = [
    [[], [], [], [], [], []],
    [
      [],
      [
        { codigo: 'IS-181', docente: 'Manuel Lagos', color: '#ff7000' },
        { codigo: 'IS-341', docente: 'Cristian Lezama', color: '#a570aa' },
      ],
      [],
      [],
      [],
      [],
    ],
    [
      [],
      [],
      [],
      [],
      [],
      [
        { codigo: 'IS-241', docente: 'Elinar Carrillo', color: '#2370dd' },
        { codigo: 'IS-181', docente: 'Manuel Lagos', color: '#ff7000' },
        { codigo: 'IS-341', docente: 'Cristian Lezama', color: '#a570aa' },
      ],
    ],
    [[], [], [], [], [], []],
    [
      [],
      [],
      [
        { codigo: 'IS-181', docente: 'Manuel Lagos', color: '#ff7000' },
        { codigo: 'IS-341', docente: 'Cristian Lezama', color: '#a570aa' },
        { codigo: 'IS-241', docente: 'Estructura de datos', color: '#2370dd' },
      ],
      [],
      [],
      [],
    ],
    [[], [], [], [], [], []],
    [
      [],
      [],
      [],
      [
        { codigo: 'IS-181', docente: 'Manuel Lagos', color: '#ff7000' },
        { codigo: 'IS-341', docente: 'Cristian Lezama', color: '#a570aa' },
        { codigo: 'IS-241', docente: 'Estructura de datos', color: '#2370dd' },
      ],
      [],
      [],
    ],
    [
      [],
      [
        { codigo: 'IS-181', docente: 'Manuel Lagos', color: '#ff7000' },
        { codigo: 'IS-341', docente: 'Cristian Lezama', color: '#a570aa' },
        { codigo: 'IS-241', docente: 'Estructura de datos', color: '#2370dd' },
      ],
      [],
      [],
      [],
      [],
    ],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [
      [],
      [],
      [],
      [],
      [],
      [
        { codigo: 'IS-241', docente: 'Elinar Carrillo', color: '#2370dd' },
        { codigo: 'IS-181', docente: 'Manuel Lagos', color: '#ff7000' },
        { codigo: 'IS-341', docente: 'Cristian Lezama', color: '#a570aa' },
      ],
    ],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [
      { codigo: 'IS-241', docente: 'Elinar Carrillo', color: '#2370dd' },
      { codigo: 'IS-181', docente: 'Manuel Lagos', color: '#ff7000' },
      { codigo: 'IS-341', docente: 'Cristian Lezama', color: '#a570aa' },
    ], [], []],
  ];

  constructor(private render: Renderer2) {}

  buscarPorCodigo(codigo: string, horarios: any): any {
    let g = [
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
    ];

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 6; j++) {
        if (horarios[i][j].length > 0) {
          let temp = horarios[i][j].filter(
            (item: any) => item.codigo.toLowerCase() === codigo.toLowerCase()
          );
          g[i][j] = temp;
        } else {
          g[i][j] = horarios[i][j];
        }
      }
    }

    return g;
  }

  buscarPorDocente(docente: string, horarios: any): any {
    let g = [
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
    ];

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 6; j++) {
        if (horarios[i][j].length > 0) {
          let temp = horarios[i][j].filter(
            (item: any) => item.docente.toLowerCase() === docente.toLowerCase()
          );
          g[i][j] = temp;
        } else {
          g[i][j] = horarios[i][j];
        }
      }
    }

    return g;
  }

  // +++++++++++++++++++ MostrarHorarios +++++++++++++++++

  @ViewChild('table') table!: ElementRef;
  @ViewChild('cardContainer') cardContainer!: ElementRef;

  mostrarHorario(horario: any): void {
    const RENDER = this.render;
    const tableHrs = this.table.nativeElement;
    const CARDCONTAINER = this.cardContainer.nativeElement;

    for (let i = 0; i < 15; i++) {
      for (let j = 1; j < 7; j++) {
        const h = horario[i][j - 1];
        if (h.length > 0) {
          const divCursos = RENDER.createElement('div');
          RENDER.addClass(divCursos, 'cursos');
          let hora: number = this.horas[i];

          const divCardDet = RENDER.createElement('div');
          RENDER.addClass(divCardDet, 'card-det');

          const spanDia = RENDER.createElement('span');
          spanDia.innerHTML = `${this.dias[j - 1]} - ${
            hora > 12 ? hora % 12 : hora
          }:00 ${hora < 12 ? 'am' : 'pm'}`;

          const iconClose = RENDER.createElement('i');
          RENDER.addClass(iconClose, 'fa-regular');
          RENDER.addClass(iconClose, 'fa-circle-xmark');
          RENDER.listen(iconClose, 'click', () => {
            RENDER.removeClass(CARDCONTAINER, 'card-container-visible');
            RENDER.removeClass(divCardDet, 'card-visible');
          });

          const divCardHead = RENDER.createElement('div');
          RENDER.appendChild(divCardHead, spanDia);
          RENDER.appendChild(divCardHead, iconClose);
          RENDER.addClass(divCardHead, 'card-head');

          RENDER.appendChild(divCardDet, divCardHead);
          let cont = 0;
          h.forEach((e: any) => {
            const divCurso = RENDER.createElement('div');
            const parrafoCod = RENDER.createElement('p');
            const parrafoDoc = RENDER.createElement('p');
            RENDER.addClass(divCurso, 'curso');
            parrafoCod.innerHTML = e.codigo;
            parrafoDoc.innerHTML = e.docente;
            RENDER.appendChild(divCurso, parrafoCod);
            RENDER.appendChild(divCurso, parrafoDoc);
            RENDER.setStyle(divCurso, 'background-color', e.color);
            if (cont === 0) {
              RENDER.appendChild(divCursos, divCurso);
            } else {
              RENDER.setStyle(divCurso, 'padding', '10px 0');
              RENDER.appendChild(divCardDet, divCurso);
            }
            cont++;
          });

          if (cont !== 1) {
            const divBtnPlus = RENDER.createElement('div');
            divBtnPlus.innerHTML = `+${cont - 1}`;
            RENDER.addClass(divBtnPlus, 'btn-plus');

            RENDER.appendChild(divCursos, divBtnPlus);
            if (i < 7) {
              if (j < 4) {
              } else {
                RENDER.addClass(divCardDet, 'card-det__right');
                RENDER.addClass(divCardDet, 'card-det__top');
              }
            } else {
              if (j < 4) {
                RENDER.addClass(divCardDet, 'card-det__bottom');
              } else {
                RENDER.addClass(divCardDet, 'card-det__bottom');
                RENDER.addClass(divCardDet, 'card-det__right');
              }
            }
            RENDER.appendChild(divCursos, divCardDet);
            RENDER.listen(divBtnPlus, 'click', () => {
              RENDER.addClass(CARDCONTAINER, 'card-container-visible');
              RENDER.addClass(divCardDet, 'card-visible');
              RENDER.listen(CARDCONTAINER, 'click', () => {
                RENDER.addClass(divCardDet, 'animation');
                setTimeout(() => {
                  RENDER.removeClass(divCardDet, 'animation');
                }, 500);
              });
            });
          }
          RENDER.appendChild(tableHrs!.children[i].children[j], divCursos);
        }
      }
    }
  }

  @ViewChild('buscarPor') buscarPor!: ElementRef;
  @ViewChild('menuBuscarPor') menuBuscarPor!: ElementRef;
  @ViewChild('seleccionar') seleccionar!: ElementRef;
  @ViewChild('menuSeleccionar') menuSeleccionar!: ElementRef;
  @ViewChild('buscarContainer') buscarContainer!: ElementRef;
  @ViewChild('caretBus') caretBus!: ElementRef;
  @ViewChild('caretSel') caretSel! : ElementRef;

  ngAfterViewInit() {
    this.mostrarHorario(this.horarios);
    let menuBuscarActive = false
    let menuSelActive = false

    const RENDER = this.render;
    const BUSCARCONTAINER = this.buscarContainer.nativeElement
    const BUSCARPOR = this.buscarPor.nativeElement
    const MENUBUSCARPOR = this.menuBuscarPor.nativeElement
    const SELECCIONAR = this.seleccionar.nativeElement
    const MENUSELECCIONAR = this.menuSeleccionar.nativeElement
    const CARETBUS = this.caretBus.nativeElement
    const CARETSEL = this.caretSel.nativeElement

    RENDER.listen(BUSCARPOR, 'click', abrirCerrarMenuBuscar)
    RENDER.listen(SELECCIONAR, 'click', abrirCerrarMenuSeleccionar)

    function abrirCerrarMenuBuscar(){
      if (menuBuscarActive){
        cerrarMenuBuscar()
      }else{
        abrirMenuBuscar()
      }
    }

    function abrirCerrarMenuSeleccionar(){
      if (menuSelActive){
        cerrarMenuSeleccionar()
      }else{
        abrirMenuSeleccionar()
      }
    }

    function cerrarMenuBuscar(){
      RENDER.removeClass(BUSCARPOR, 'selected-clicked')
      RENDER.removeClass(MENUBUSCARPOR, 'menu-open')
      RENDER.removeClass(CARETBUS, 'caret-rotate')
      menuBuscarActive = false
    }

    function abrirMenuBuscar(){
      cerrarMenuSeleccionar()

      RENDER.addClass(BUSCARPOR, 'selected-clicked')
      RENDER.addClass(MENUBUSCARPOR, 'menu-open')
      RENDER.addClass(CARETBUS, 'caret-rotate')
      menuBuscarActive = true
    }

    function cerrarMenuSeleccionar(){
      RENDER.removeClass(SELECCIONAR, 'selected-clicked')
      RENDER.removeClass(MENUSELECCIONAR, 'menu-open')
      RENDER.removeClass(CARETSEL, 'caret-rotate')
      menuSelActive = false
    }

    function abrirMenuSeleccionar(){
      cerrarMenuBuscar()

      RENDER.addClass(SELECCIONAR, 'selected-clicked')
      RENDER.addClass(MENUSELECCIONAR, 'menu-open')
      RENDER.addClass(CARETSEL, 'caret-rotate')
      menuSelActive = true
    }
  }
}
