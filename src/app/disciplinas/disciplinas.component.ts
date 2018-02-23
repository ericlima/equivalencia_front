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
  public pagina = 0;

  constructor(
    private service: DisciplinaService,
    private iesService: IesService
  ) { }

  ngOnInit() {
    this.iesService.obterIesCombo().subscribe(res => this.iesList = res);
  }

  selecionaDisciplina(id: number) {
    this.service.obtemDisciplina(id).subscribe(res => this.disciplina = res);
  }

  onChangeDisc() {
    this.cargaPagina();
    // this.service.obtemDisciplina(this.disciplinas[0]).subscribe(res => this.disciplina = res);
  }

  cargaPagina() {
    this.service.obtemDisciplinas(this.iesSelecionada, this.pagina).subscribe(res => this.disciplinas = res);
  }

  proximo() {
    this.pagina++;
    this.cargaPagina();
  }

  anterior() {
    if (this.pagina > 0) {
      this.pagina--;
      this.cargaPagina();
    }
  }
}
