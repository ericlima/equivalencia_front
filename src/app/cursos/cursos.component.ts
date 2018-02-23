import { CursoService } from './../services/curso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public cursos = [];

  constructor(
    private service: CursoService
  ) { }

  ngOnInit() {
    this.service.obtemListaCurso(0).subscribe(res => this.cursos = res);
  }
}  
