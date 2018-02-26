import { Component, OnInit } from '@angular/core';

import { IesService } from '../services/ies.service';

import { Ies } from '../classes/ies';

@Component({
  selector: 'app-ies',
  templateUrl: './ies.component.html',
  styleUrls: ['./ies.component.css'],
  providers: [IesService]
})
export class IesComponent implements OnInit {

  public listIes: Ies[] = new Array();
  public ies: Ies;
  public selecionado = 0;
  public pagina = 1;
  public pesquisaPorNome = "";

  constructor(
    private service: IesService
  ) { }

  ngOnInit() {
    this.cargaPagina();
  }

  onSearchChange(searchValue: string) {
    if (searchValue.length > 3) {
      this.pesquisaPorNome = searchValue;
    } else {
      this.pesquisaPorNome = '';
    }
    this.cargaPagina();
  }

  onChangeDisc() {
    this.pagina = 1;
    this.pesquisaPorNome = '';
    this.cargaPagina();
  }

  cargaPagina() {
    if (this.pesquisaPorNome.length > 3) {
      this.service.buscaPorNome(this.pesquisaPorNome, this.pagina - 1).subscribe(res => this.listIes = res);
    } else {
      this.service.obtemListaIes(this.pagina - 1).subscribe(res => this.listIes = res);
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





