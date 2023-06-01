import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectContent } from 'src/app/Interfaces/select-input/select-input';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  Listcontent! : SelectContent[] ;

  activeIndex: number = 1;

  scrollableTabs: any[] = Array.from({ length: 5 }, (_, i) => ({ title: "Title", content: "Content" }));

  testGroup!: FormGroup;

  constructor(private fb: FormBuilder){
    this.createForm()
  }

  defTextOption = "SELECCIONE UNA OPCIÓN"

  createForm():void{
    this.testGroup = this.fb.group({
      name : ["", Validators.required],
      fullname : ["", Validators.required],
      option : ["", Validators.required]
    })
  }

  //funcion type
  funcionTest : Function = ()=>{
    console.log(this.testGroup.valid)
  }

  ngOnInit(): void {
    //seteamos datos para las opciones de select de prueba
    this.Listcontent = [
      {
        value: "",
        text: "Operacion craneana"
      },
      {
        value: "operar abomen",
        text: "Operacion abdominal"
      },
      {
        value: "operar numeros",
        text: "Operacion numerica"
      },
    ]
  }
  tabclick(){
    console.log("hola")
  }

}
