import { Component } from '@angular/core';
import datos from '../../../assets/data/datos.json';

interface DATOS {
  id: String;
  asignatura:{
    codigo: String,
    nombre: String,
    horario:{
        dia: String,
        hora:{
            inicio: Number,
            fin: Number,
            indicador:{
                inicio: String,
                fin: String
            }
        }
    },
    vacantes: Number
  },
  docente: {
      nombres: String,
      apellidos: String
  }
}

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})

export class MatriculaComponent {
  Datos: DATOS[] = datos;
  constructor(){
    console.log(this.Datos)
  }
}
