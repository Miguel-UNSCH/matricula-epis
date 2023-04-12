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
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { HttpClientModule } from '@angular/common/http';

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
    PagosComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
