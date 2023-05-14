import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserU } from 'src/app/Interfaces/user/userU';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  public datos = JSON.parse(localStorage.getItem('407h')!);
  public user: string;

  public myForm: FormGroup = this.fb.group({
    nombres: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    codigo: [, [Validators.required, Validators.minLength(8)]],
    serie: ['', [Validators.required, Validators.minLength(3)]],
    semestre: ['', [Validators.required, Validators.minLength(3)]],

    celular: [, [Validators.required, Validators.minLength(9)]],
    facebook: ['', [Validators.required, Validators.minLength(3)]],
    whatsaap: [, [Validators.required, Validators.minLength(9)]],
    linkedin: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder) {
    console.log(this.datos);
    this.user = this.datos.currentUser.displayName;
  }

  // public usuario: UserU = {
  //   nombres: 'JUAN GABRIEL',
  //   apellidos: 'QUISPE QUISPE',
  //   codigo: '27000000',
  //   serie: 'A',
  //   correo: this.datos.currentUser.email
  // };

  ngOnInit(): void {
    this.myForm.reset({
      // nombres: 'JUAN GABRIEL',
      apellidos: 'QUISPE QUISPE',
      codigo: '27000000',

      correo: this.datos.currentUser.email
    });
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field] ) {
      return null;
    }

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'pattern':
          return 'El formato es inválido';
        default:
          return 'Error desconocido';
      }
    }

    return null
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
