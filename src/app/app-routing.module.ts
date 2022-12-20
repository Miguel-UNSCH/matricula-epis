import { MainComponent } from './componentes/main-page/main.component';
import { NotFundComponent } from './componentes/not-fund/not-fund.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';

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
    pathMatch: "full",
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
