import { DisciplinaService } from './../services/disciplina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {

  public disciplinas = [];

  constructor(
    private service: DisciplinaService
  ) { }

  ngOnInit() {
    this.service.obtemDisciplinas(0).subscribe(res => this.disciplinas = res);
  }



}
