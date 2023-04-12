import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  userMail : string = 'franklin.figueroa.27@unsch.edu.pe'
  user_receiver :Params = this.activatedRoute.snapshot.params
  mail_recept : string = this.user_receiver['id']

  PAGOS_DATA: any[] = [];

  ngOnInit() : void {
    //comprueba si el parametro enviado del email es correcto y pertence a la sesión
    if (!this.isUserMailIn()){
      this.router.navigate(['usuario/pagos/' + this.userMail])
      this.mail_recept = this.userMail
    }

    this.PAGOS_DATA = [
      {
        name: "name sent",
        b : "b",
        c : "c",
        d : "d",
        e : "e",
        f : "f",
        g : "g"
      },
    ]
  }

  private isUserMailIn() : boolean {
    return !(this.userMail != this.mail_recept)
  }

}
