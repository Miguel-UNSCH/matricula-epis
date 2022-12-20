import {Component, OnInit} from '@angular/core';
import datos from '../../../assets/data/datos.json';
import { CURSOS } from 'src/app/Interfaces/curso/cursos';


@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})

export class MatriculaComponent implements OnInit{
  Cursos: CURSOS[] = datos;
  CursosAgregados: CURSOS[] = []; // aqui se guardan los cursos agregados
  constructor(){
  }
  
  agregar(dato: any){
    const result = this.CursosAgregados.find(curso => curso.id === dato.id)
    if(result){
      console.log('ya agregaste el curso')
    }else
    {
      this.CursosAgregados.push(dato)
    }
    localStorage.removeItem('curso')
    localStorage.setItem('curso', JSON.stringify(this.CursosAgregados))
  }

  remover(dato: any){
    const filter = this.CursosAgregados.filter(
      (curso) => curso.id !== dato.id)
    this.CursosAgregados = filter
    localStorage.removeItem('curso')
    localStorage.setItem('curso', JSON.stringify(this.CursosAgregados))
  }

  ngOnInit(): void {
    let cursosRecuperados = localStorage.getItem('curso')
    this.CursosAgregados = JSON.parse(cursosRecuperados!)
  }
}