import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app.router';

import { AppComponent } from './app.component';

import { CursosComponent } from './cursos/cursos.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { IesComponent } from './ies/ies.component';

import { DisciplinaService } from './services/disciplina.service';
import { IesService } from './services/ies.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    DisciplinasComponent,
    IesComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
