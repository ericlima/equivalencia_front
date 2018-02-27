import { Ies } from './../classes/ies';
import { IesService } from './../services/ies.service';
import { DisciplinaService } from './../services/disciplina.service';
import { DisciplinapadraoService } from './../services/disciplinapadrao.service';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  providers: [DisciplinaService, IesService, DisciplinapadraoService],
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {

  public iesList: Ies[] = [];
  public iesSelecionada = 0;
  public disciplinas = [];
  public disciplinasPadrao = [];

  public disciplina = {'id': 0, 'nome': '', 'cargaHoraria': 0};
  public disciplinaPosicaoArray = 0;
  public confirmacao = 0;
  public disciplinaPadrao = {'id': 0, 'nome': '', 'cargaHoraria': 0};

  public pagina = 1;
  public paginaPadrao = 1;
  public pesquisaPorNome = '';
  public pesquisaPorNomePadrao = '';

  constructor(
    private service: DisciplinaService,
    private servicePadrao: DisciplinapadraoService,
    private iesService: IesService
  ) { }

  ngOnInit() {
    this.iesService.obterIesCombo().subscribe(res => this.iesList = res);
  }

  onSearchChange(searchValue: string) {
    if (searchValue.length > 0) {
      this.pesquisaPorNome = searchValue;
    } else {
      this.pesquisaPorNome = '';
    }
    this.cargaPagina();
  }

  onSearchChangeStandard(searchValue2: string) {
    if (searchValue2.length > 0) {
      this.pesquisaPorNomePadrao = searchValue2;
    } else {
      this.pesquisaPorNomePadrao = '';
    }
    this.cargaPaginaPadrao();
  }

  selecionaDisciplina(id: number, posicao: number) {
    this.confirmacao = id,
    this.disciplinaPosicaoArray = posicao,
    this.pesquisaPorNomePadrao = '',
    this.service.obtemDisciplina(id).subscribe(res => this.disciplina = res);
  }

  desassocia(id: number, posicao: number) {
    this.service.desassocia(id).subscribe();
    this.cargaPagina();
  }

  associa(id: number, posicao: number) {

    Promise.all([
    this.service.associa(id).subscribe(),
    this.service.obtemDisciplina(id).subscribe(res => this.disciplina = res),
    this.disciplinas[posicao].idDisciplinaPadrao = this.disciplina.id,
    this.disciplinas[posicao].nomeDisciplinaPadrao = this.disciplina.nome,
    this.disciplinas[posicao].cargaHorariaDisciplinaPadrao = this.disciplina.cargaHoraria
    ]);
  }

  onChangeIes() {
    this.pagina = 1,
    this.paginaPadrao = 1,
    this.pesquisaPorNome = '',
    this.pesquisaPorNomePadrao = '',
    this.disciplina = {'id': 0, 'nome': '', 'cargaHoraria': 0},
    this.disciplinaPosicaoArray = 0,
    this.confirmacao = 0,
    this.disciplinaPadrao = {'id': 0, 'nome': '', 'cargaHoraria': 0},
    this.pesquisaPorNomePadrao = '',
    this.disciplinasPadrao = [];
    this.cargaPagina();
  }

  zeraParametros() {
    this.disciplina = {'id': 0, 'nome': '', 'cargaHoraria': 0},
    this.disciplinaPosicaoArray = 0,
    this.confirmacao = 0,
    this.disciplinaPadrao = {'id': 0, 'nome': '', 'cargaHoraria': 0},
    this.pesquisaPorNomePadrao = '',
    this.disciplinasPadrao = [];
    console.log('zeraParametros');
  }

  confirmaEdicao() {
    Promise.all([
    this.service.salvarDisciplina(this.disciplinas[this.disciplinaPosicaoArray]),
    this.confirmacao = 0,
    this.disciplina = {'id': 0, 'nome': '', 'cargaHoraria': 0},
    this.disciplinaPosicaoArray = 0,
    this.confirmacao = 0,
    this.disciplinaPadrao = {'id': 0, 'nome': '', 'cargaHoraria': 0},
    this.pesquisaPorNomePadrao = '',
    this.disciplinasPadrao = [],
    this.cargaPagina(),
    console.log('confirmaEdicao')]);
  }

  cargaPagina() {
    if (this.pesquisaPorNome.length > 3) {
      this.service.buscaPorNome(this.pesquisaPorNome, this.pagina - 1).subscribe(res => this.disciplinas = res);
    } else {
      this.service.obtemDisciplinas(this.iesSelecionada, this.pagina - 1).subscribe(res => this.disciplinas = res);
    }
    console.log('cargaPagina');
  }

  cargaPaginaPadrao() {
    if (this.pesquisaPorNomePadrao.length > 3) {
      this.servicePadrao.buscaPorNome(this.pesquisaPorNomePadrao, this.paginaPadrao - 1).subscribe(res => this.disciplinasPadrao = res);
    } else {
      this.disciplinasPadrao = [];
    }
  }

  atribuirDisciplinaPadrao(disciplinaPadrao) {
    this.disciplinaPadrao = disciplinaPadrao,
    this.confirmacao = this.disciplina.id,
    this.buildaDisciplina(disciplinaPadrao);
  }

  buildaDisciplina(disciplinaPadrao) {
    this.disciplinas[this.disciplinaPosicaoArray].idDisciplinaPadrao = disciplinaPadrao.id,
    this.disciplinas[this.disciplinaPosicaoArray].nomeDisciplinaPadrao = disciplinaPadrao.nome,
    this.disciplinas[this.disciplinaPosicaoArray].cargaHorariaDisciplinaPadrao = disciplinaPadrao.cargaHoraria;
  }

  proximo() {
    this.zeraParametros(),
    this.pagina++,
    this.cargaPagina();
  }

  anterior() {
    if (this.pagina > 1) {
      this.zeraParametros(),
      this.pagina--,
      this.cargaPagina();
    }
  }

  proximoPadrao() {
    this.paginaPadrao++,
    this.cargaPaginaPadrao();
  }

  anteriorPadrao() {
    if (this.paginaPadrao > 1) {
      this.paginaPadrao--,
      this.cargaPaginaPadrao();
    }
  }
}
