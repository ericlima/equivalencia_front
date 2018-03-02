import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './app.router';

import { AppComponent } from './app.component';

import { CursosComponent } from './components/cursos/cursos.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { IesComponent } from './components/ies/ies.component';

import { DisciplinaService } from './provider/disciplina.service';
import { DisciplinapadraoService } from './provider/disciplinapadrao.service';
import { IesService } from './provider/ies.service';
import { FormsModule } from '@angular/forms';
import { CursoService } from './provider/curso.service';

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
  providers: [DisciplinaService, IesService, CursoService, DisciplinapadraoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
