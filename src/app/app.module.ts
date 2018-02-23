import { IesService } from './services/ies.service';
import { DisciplinaService } from './services/disciplina.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './app.router';

import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { IesComponent } from './ies/ies.component';

@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    DisciplinasComponent,
    IesComponent,
    DisciplinaService
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [DisciplinaService, IesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
