import { MainComponent } from './componentes/main-page/main.component';
import { NotFundComponent } from './componentes/not-fund/not-fund.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MatriculaComponent } from './componentes/matricula/matricula.component';
import { HorarioComponent } from './componentes/horario/horario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404-not-found',
    component: NotFundComponent
  },
  {
    path: 'usuario',
    component: MainComponent,
    children: [
      {
        path: 'matricula',
        component: MatriculaComponent
      },
      {
        path: 'horario',
        component: HorarioComponent
      }
    ],
    // pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: "404-not-found"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
