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
import { AdminComponent } from './componentes/admin/admin.component';
import { TabViewModule } from 'primeng/tabview';
import { HorariosAdminComponent } from './componentes/admin/admin-componentes/horarios-admin/horarios-admin.component';
import { UpdateUserDataComponent } from './componentes/update-user-data/update-user-data.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './componentes/inputs/input-text/input-text.component';
import { InputDateComponent } from './componentes/inputs/input-date/input-date.component';
import { InpuSelectComponent } from './componentes/inputs/inpu-select/inpu-select.component';
import { CustomBtnComponent } from './componentes/inputs/custom-btn/custom-btn.component';
import { InputHourComponent } from './componentes/inputs/input-hour/input-hour.component';
import { ColorInputComponent } from './componentes/inputs/color-input/color-input.component';
import { ImagenRotaDirective } from './directivas/imagen-rota.directive';
import { AdminResourcesComponent } from './componentes/admin/admin-componentes/admin-resources/admin-resources.component';
import { InputPasswordComponent } from './componentes/inputs/input-password/input-password.component';

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
    AdminComponent,
    HorariosAdminComponent,
    UpdateUserDataComponent,
    InputTextComponent,
    InputDateComponent,
    InpuSelectComponent,
    CustomBtnComponent,
    InputHourComponent,
    ColorInputComponent,
    ImagenRotaDirective,
    AdminResourcesComponent,
    InputPasswordComponent,
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
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    PrimeNgModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
