import {Component} from '@angular/core';
import datos from '../../../assets/data/datos.json';

interface DATOS {
  id: Number;
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

interface CURSOS{
  id: Number;
  codigo: String,
  nombre: String,
  vacantes: Number,
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



export class MatriculaComponent{
  Datos: DATOS[] = datos;
  Cursos: CURSOS[] = [];
  constructor(){
  }
   
  ngAfterViewInit() {
    // Agregar cursos
    const botonesAdd = document.querySelectorAll('.button-add')
    botonesAdd.forEach(button => {
      button.addEventListener('click', () => {
        const a = button.classList[0]
        const id = Number(a.substring(0, a.indexOf('-')))
        const selected = this.Datos[id-1]
        const c = {
          id: id,
          codigo: selected.asignatura.codigo,
          nombre: selected.asignatura.nombre,
          vacantes: selected.asignatura.vacantes,
          docente: {
            nombres: selected.docente.nombres,
            apellidos: selected.docente.apellidos
          }
        }
        
        const result = this.Cursos.find(curso => curso.id === c.id)
        
        if(result){
          console.log('ya agregaste el curso')
        }else
        {
          this.Cursos.push(c)
        }
        
      })
    })
  }

  ngAfterViewChecked(){
    const botonesRemove = document.querySelectorAll('.button-remove')
    botonesRemove.forEach(button => {
      button.addEventListener('click', () => {
        const a = button.classList[0]
        const id = Number(a.substring(0, a.indexOf('-')))
        const selected = this.Datos[id-1]
        const filter = this.Cursos.filter((dato) => dato.id !== selected.id)
        this.Cursos = filter
      })
    })
  }
}