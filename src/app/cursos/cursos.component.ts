import { CursoService } from './../services/curso.service';
import { IesService } from './../services/ies.service';

import { Component, OnInit } from '@angular/core';

import { Ies } from './../classes/ies';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  providers: [CursoService, IesService],
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public iesList: Ies[] = [];
  public iesSelecionada = 0;
  public cursos = [];
  public curso = {};
  public selecionado = 0;
  public pagina = 1;
  public pesquisaPorNome = "";  

  constructor(
    private service: CursoService,    
    private iesService: IesService
  ) { }

  ngOnInit() {    
    this.iesService.obterIesCombo().subscribe(res => this.iesList = res);
  }

  onSearchChange(searchValue: string) {
    if (searchValue.length > 3) {
      this.pesquisaPorNome = searchValue;
    }
    this.cargaPagina();
  }

  selecionaCurso(id: number) {
    this.service.obtemCurso(id).subscribe(res => this.curso = res);
  }

  onChangeCurso() {
    this.pesquisaPorNome = ""
    this.cargaPagina();    
  }

  cargaPagina() {
    if (this.pesquisaPorNome.length > 3) {
      this.service.buscaPorNome(this.pesquisaPorNome, this.pagina-1).subscribe(res => this.cursos = res);
    } else {
      this.service.obtemCursos(this.iesSelecionada, this.pagina-1).subscribe(res => this.cursos = res);
    }    
  }

  proximo() {
    this.pagina++;
    this.cargaPagina();
  }

  anterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.cargaPagina();
    }
  }
}  
