import { Ies } from './../classes/ies';
import { IesService } from '../../provider/ies.service';
import { CursoService } from '../../provider/curso.service';
import { CursopadraoService } from '../../provider/cursopadrao.service';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  providers: [CursoService, IesService, CursopadraoService],
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public iesList: Ies[] = [];
  public iesSelecionada = 0;
  public cursos = [];
  public cursosPadrao = [];

  public curso = {'id': 0, 'nome': ''};
  public cursoPosicaoArray = 0;
  public confirmacao = 0;
  public cursoPadrao = {'id': 0, 'nome': ''};

  public pagina = 1;
  public paginaPadrao = 1;
  public pesquisaPorNome = '';
  public pesquisaPorNomePadrao = '';

  constructor(
    private service: CursoService,
    private servicePadrao: CursopadraoService,
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

  selecionaCurso(id: number, posicao: number) {
    this.confirmacao = id,
    this.cursoPosicaoArray = posicao,
    this.pesquisaPorNomePadrao = '',
    this.service.obtemCurso(id).subscribe(res => this.curso = res);
  }

  desassocia(id: number, posicao: number) {
    this.cursoPosicaoArray = posicao,
    this.cursoPadrao = {'id': 0, 'nome': ''},
    this.confirmacao = id,
    this.cursos[posicao].idCursoPadrao = 0;
  }

  associa(id: number, posicao: number) {
    console.log(this.servicePadrao.salvarCurso(this.cursos[this.cursoPosicaoArray]));
    this.cursoPosicaoArray = posicao;
    this.cursoPadrao = this.cursos[posicao];
    this.confirmacao = id;
    this.cursos[posicao].idCursoPadrao = id;
  }

  onChangeIes() {
    this.pagina = 1,
    this.paginaPadrao = 1,
    this.pesquisaPorNome = '',
    this.pesquisaPorNomePadrao = '',
    this.curso = {'id': 0, 'nome': ''},
    this.cursoPosicaoArray = 0,
    this.confirmacao = 0,
    this.cursoPadrao = {'id': 0, 'nome': ''},
    this.pesquisaPorNomePadrao = '',
    this.cursosPadrao = [];
    this.cargaPagina();
  }

  zeraParametros() {
    this.curso = {'id': 0, 'nome': ''},
    this.cursoPosicaoArray = 0,
    this.confirmacao = 0,
    this.cursoPadrao = {'id': 0, 'nome': ''},
    this.pesquisaPorNomePadrao = '',
    this.cursosPadrao = [];
    console.log('zeraParametros');
  }

  confirmaEdicao() {
    Promise.all([
    this.service.salvarCurso(this.cursos[this.cursoPosicaoArray]),
    this.confirmacao = 0,
    this.curso = {'id': 0, 'nome': ''},
    this.cursoPosicaoArray = 0,
    this.confirmacao = 0,
    this.cursoPadrao = {'id': 0, 'nome': ''},
    this.pesquisaPorNomePadrao = '',
    this.cursosPadrao = [],
    this.cargaPagina(),
    console.log('confirmaEdicao')]);
  }

  cargaPagina() {
    if (this.pesquisaPorNome.length > 3) {
      this.service.buscaPorNome(this.pesquisaPorNome, this.pagina - 1).subscribe(res => this.cursos = res);
    } else {
      this.service.obtemCursos(this.iesSelecionada, this.pagina - 1).subscribe(res => this.cursos = res);
    }
    console.log('cargaPagina');
  }

  cargaPaginaPadrao() {
    if (this.pesquisaPorNomePadrao.length > 3) {
      this.servicePadrao.buscaPorNome(this.pesquisaPorNomePadrao, this.paginaPadrao - 1).subscribe(res => this.cursosPadrao = res);
    } else {
      this.cursosPadrao = [];
    }
  }

  atribuirCursoPadrao(cursoPadrao) {
    this.cursoPadrao = cursoPadrao,
    this.confirmacao = this.curso.id,
    this.buildaCurso(cursoPadrao);
  }

  buildaCurso(cursoPadrao) {
    this.cursos[this.cursoPosicaoArray].idCursoPadrao = cursoPadrao.id,
    this.cursos[this.cursoPosicaoArray].nomeCursoPadrao = cursoPadrao.nome;
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
