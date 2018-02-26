import { Ies } from './../classes/ies';
import { IesService } from './../services/ies.service';
import { DisciplinaService } from './../services/disciplina.service';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  providers: [DisciplinaService, IesService],
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {

  public iesList: Ies[] = [];
  public iesSelecionada = 0;
  public disciplinas = [];
  public disciplina = {};
  public selecionado = 0;
  public pagina = 1;
  public pesquisaPorNome = '';
  public confirmacao = false;

  constructor(
    private service: DisciplinaService,
    private iesService: IesService
  ) { }

  ngOnInit() {
    this.iesService.obterIesCombo().subscribe(res => this.iesList = res);
  }

  onSearchChange(searchValue: string) {
    if (searchValue.length > 3) {
      this.pesquisaPorNome = searchValue;
    } else {
      this.pesquisaPorNome = '';
    }
    this.cargaPagina();
  }

  selecionaDisciplina(id: number) {
    this.service.obtemDisciplina(id).subscribe(res => this.disciplina = res);
  }

  onChangeDisc() {
    this.pagina = 1;
    this.pesquisaPorNome = '';
    this.cargaPagina();
  }

  cargaPagina() {
    if (this.pesquisaPorNome.length > 3) {
      this.service.buscaPorNome(this.pesquisaPorNome, this.pagina - 1).subscribe(res => this.disciplinas = res);
    } else {
      this.service.obtemDisciplinas(this.iesSelecionada, this.pagina - 1).subscribe(res => this.disciplinas = res);
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
