import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NotFundComponent } from './componentes/not-fund/not-fund.component';
import { MainComponent } from './componentes/main-page/main.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { ForbiddenComponent } from './componentes/forbidden/forbidden.component';
import { MatriculaComponent } from './componentes/matricula/matricula.component';
import { HorarioComponent } from './componentes/horario/horario.component';
import { DeudasComponent } from './componentes/deudas/deudas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { HttpClientModule } from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFundComponent,
    MainComponent,
    LoadingComponent,
    ForbiddenComponent,
    MatriculaComponent,
    HorarioComponent,
    DeudasComponent,
    PagosComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    SweetAlert2Module.forRoot(),
    provideDatabase(() => getDatabase()),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    PrimeNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
