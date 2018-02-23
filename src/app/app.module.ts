import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './app.router';

import { AppComponent } from './app.component';

import { CursosComponent } from './cursos/cursos.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { IesComponent } from './ies/ies.component';

import { IesService } from './services/ies.service';
import { DisciplinaService } from './services/disciplina.service';     
import { CursoService } from './services/curso.service';

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
    HttpModule 
  ],
  providers: [DisciplinaService, IesService, CursoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
