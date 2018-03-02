import { Ies } from '../../components/classes/ies';
import { IesService } from '../../provider/ies.service';
import { DisciplinaService } from '../../provider/disciplina.service';
import { DisciplinapadraoService } from '../../provider/disciplinapadrao.service';
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

  public disciplina = {'id': null, 'nome': '', 'cargaHoraria': null, 'nomeDisciplinaPadrao': null, 'cargaHorariaDisciplinaPadrao': null};
  public disciplinaPosicaoArray = 0;
  public confirmacao = 0;
  public disciplinaPadrao = {'id': null, 'nome': '', 'cargaHoraria': null};

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
    this.desassociaServico(id)
    .limpaDisciplinaPadrao(posicao);
  }

  desassociaServico(id) {
    this.service.desassocia(id).subscribe();
    return this;
  }

  associa(id: number, posicao: number) {
    this.associaServico(id)
    .associaObterDisciplina(id);
  }

  associaServico(id) {
    this.service.associa(id).subscribe();
    return this;
  }

  associaObterDisciplina(id) {
    this.service.obtemDisciplina(id).subscribe(function(res) {
       this.disciplina = res;
       console.log(this.disciplina);
    });

    return this;
  }

  onChangeIes() {
    this.pagina = 1,
    this.paginaPadrao = 1,
    this.pesquisaPorNome = '',
    this.pesquisaPorNomePadrao = '',
    this.disciplinaPosicaoArray = 0,
    this.confirmacao = 0,
    this.pesquisaPorNomePadrao = '',
    this.disciplinasPadrao = [],
    this.anulaDisciplina()
    .anulaDisciplinaPadrao()
    .cargaPagina();
  }

  zeraParametros() {
    this.anulaDisciplina()
    .anulaDisciplinaPadrao();
    this.disciplinaPosicaoArray = 0;
    this.confirmacao = 0;
    this.pesquisaPorNomePadrao = '';
    this.disciplinasPadrao = [];
    return this;
  }

  confirmaEdicao(id: number, pos: number) {
    this.salvaDisciplina()
    .associaObterDisciplina(id)
    .mostraDisciplinaPosEdicao(pos)
    .limpaConfirmacao();
  }

  mostraDisciplinaPosEdicao(pos: number) {
    this.disciplinas[pos].nomeDisciplinaPadrao = this.disciplina.nomeDisciplinaPadrao;
    this.disciplinas[pos].cargaHorariaDisciplinaPadrao = this.disciplina.cargaHorariaDisciplinaPadrao;
    return this;
  }

  cancelaEdicao(pos: number) {
    this
    .limpaConfirmacao()
    .limpaDisciplinaPadrao(pos)
    .buildaDisciplina(this.disciplinaPadrao);
  }

  salvaDisciplina() {
    this.service.salvarDisciplina(this.disciplinas[this.disciplinaPosicaoArray]);
    console.log(this.disciplinaPosicaoArray);
    return this;
  }

  limpaConfirmacao() {
    this.confirmacao = 0;
    return this;
  }

  limpaDisciplina() {
    this.anulaDisciplina()
    .anulaDisciplinaPadrao();
    this.disciplinaPosicaoArray = 0;
    this.confirmacao = 0;
    this.pesquisaPorNomePadrao = '';
    this.disciplinasPadrao = [];
    return this;
  }

  cargaPagina() {
    if (this.pesquisaPorNome.length > 2) {
      this.service.buscaPorNome(this.pesquisaPorNome, this.pagina - 1).subscribe(res => this.disciplinas = res);
    } else {
      this.service.obtemDisciplinas(this.iesSelecionada, this.pagina - 1).subscribe(res => this.disciplinas = res);
    }
    return this;
  }

  cargaPaginaPadrao() {
    if (this.pesquisaPorNomePadrao.length > 2) {
      this.servicePadrao.buscaPorNome(this.pesquisaPorNomePadrao, this.paginaPadrao - 1).subscribe(res => this.disciplinasPadrao = res);
    } else {
      this.disciplinasPadrao = [];
    }
    return this;
  }

  atribuirDisciplinaPadrao(disciplinaPadrao) {
    this.disciplinaPadrao = disciplinaPadrao,
    this.confirmacao = this.disciplina.id,
    this.buildaDisciplina(disciplinaPadrao);
    return this;
  }

  buildaDisciplina(disciplinaPadrao) {
    this.disciplinas[this.disciplinaPosicaoArray].idDisciplinaPadrao = disciplinaPadrao.id,
    this.disciplinas[this.disciplinaPosicaoArray].nomeDisciplinaPadrao = disciplinaPadrao.nome,
    this.disciplinas[this.disciplinaPosicaoArray].cargaHorariaDisciplinaPadrao = disciplinaPadrao.cargaHoraria;
    return this;
  }

  limpaDisciplinaPadrao(posicao) {
    this.disciplinas[posicao].idDisciplinaPadrao = null,
    this.disciplinas[posicao].nomeDisciplinaPadrao = null,
    this.disciplinas[posicao].cargaHorariaDisciplinaPadrao = null;
    return this;
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

  anulaDisciplina() {
    this.disciplina = {'id': null, 'nome': '', 'cargaHoraria': null, 'nomeDisciplinaPadrao': null, 'cargaHorariaDisciplinaPadrao': null};
    return this;
  }

  anulaDisciplinaPadrao() {
    this.disciplinaPadrao = {'id': null, 'nome': '', 'cargaHoraria': null};
    return this;
  }
}
