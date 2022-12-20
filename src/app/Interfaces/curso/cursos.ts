export interface CURSOS{
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