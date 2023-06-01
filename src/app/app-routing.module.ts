import { PagosComponent } from './componentes/pagos/pagos.component';
import { MainComponent } from './componentes/main-page/main.component';
import { NotFundComponent } from './componentes/not-fund/not-fund.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MatriculaComponent } from './componentes/matricula/matricula.component';
import { HorarioComponent } from './componentes/horario/horario.component';
import { DeudasComponent } from './componentes/deudas/deudas.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { AuthGuardGuard } from './Guards/auth-guard.guard';
import { ForbiddenComponent } from './componentes/forbidden/forbidden.component';
import { LoginGuard } from './Guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [LoginGuard]
  },
  {
    path: '404-not-found',
    component: NotFundComponent
  },
  {
    path: 'usuario',
    component: MainComponent,
    canActivate : [AuthGuardGuard],
    canActivateChild : [], 
    children: [
      {
        path: 'matricula',
        component: MatriculaComponent
      },
      {
        path: 'horario',
        component: HorarioComponent
      },
      {
        path: 'pagos/:id',
        component: PagosComponent,
      },
      {
        path: 'deudas',
        component: DeudasComponent
      },
      {
        path: "admin",
        component : AdminComponent
      }
    ],
    // pathMatch: "full"
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
