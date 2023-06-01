import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectContent } from 'src/app/Interfaces/select-input/select-input';

@Component({
  selector: 'app-horarios-admin',
  templateUrl: './horarios-admin.component.html',
  styleUrls: ['./horarios-admin.component.css']
})
export class HorariosAdminComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  // Grupo del formulario de horario
  horarioAdminForm!: FormGroup;

  // Inicializa el componente
  ngOnInit(): void {
    this.horarioAdminForm = this.fb.group({
      docente: new FormControl({ value: '', disabled: true }),
      codigoCurso: ['', Validators.required],
      nombreCurso: ['', Validators.required],
      colorCurso: ['', Validators.required],
      diaCurso: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      vacantes: ['', Validators.required]
    });
  }

  // Días para el selector
  daysOfSelector: SelectContent[] = [
    { text: 'Lunes', value: 'Lunes' },
    { text: 'Martes', value: 'Martes' },
    { text: 'Miércoles', value: 'Miércoles' },
    { text: 'Jueves', value: 'Jueves' },
    { text: 'Viernes', value: 'Viernes' },
    { text: 'Sábado', value: 'Sábado' }
  ];

  hoursOfSelector : SelectContent[] = [
    {
      text  : "7:00 AM",
      value : "1"
    },
    {
      text  : "8:00 AM",
      value : "2"
    },
    {
      text  : "9:00 AM",
      value : "3"
    },
    {
      text  : "10:00 AM",
      value : "4"
    },
    {
      text  : "11:00 AM",
      value : "5"
    },
    {
      text  : "12:00 PM",
      value : "6"
    },
    {
      text  : "1:00 PM",
      value : "7"
    },
    {
      text  : "2:00 PM",
      value : "8"
    },
    {
      text  : "3:00 PM",
      value : "9"
    },
    {
      text  : "4:00 PM",
      value : "10"
    },
    {
      text  : "5:00 PM",
      value : "11"
    },
    {
      text  : "6:00 PM",
      value : "12"
    },
    {
      text  : "7:00 PM",
      value : "13"
    },
    {
      text  : "8:00 PM",
      value : "14"
    },
    {
      text  : "9:00 PM",
      value : "15"
    },
  ]
  // Función para guardar
  protected SaveSchedule : Function = () => {
    this.cursos.push({
      num: this.cursos.length,
      courseName: this.horarioAdminForm.value.nombreCurso,
      courseCode: this.horarioAdminForm.value.codigoCurso,
      courseColor: this.horarioAdminForm.value.colorCurso
    });
  }

  // Datos para la tabla
  cursos: any[] = [
    {
      num: 1,
      courseName: 'PSI',
      courseCode: 'IS-402',
      courseColor: '#FFac32'
    },
    {
      num: 2,
      courseName: 'O y M',
      courseCode: 'IS-518',
      courseColor: '#1f75e5'
    },
    {
      num: 3,
      courseName: 'O y M',
      courseCode: 'IS-518',
      courseColor: '#18ff14'
    },
  ];


}
