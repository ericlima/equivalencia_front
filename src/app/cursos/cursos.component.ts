import { CursoService } from './../services/curso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public cursos = [];
  qtdPaginas = 0;
  paginacao: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  paginacaoOffset = 0;

  constructor(
    private service: CursoService
  ) { }

  ngOnInit() {
    this.contaPaginas();
    this.service.obtemListaCurso(0).subscribe(res => this.cursos = res);
  }

  contaPaginas() {
    this.service.contaPaginas().subscribe(res => this.qtdPaginas = parseInt(res, 10));
  }

  paginado(pagina: number) {
    this.service.obtemListaCurso(pagina).subscribe(res => this.cursos = res);
  }

  proximo() {
    this.paginacaoOffset = this.paginacaoOffset + 10;

    for (const num of this.paginacao) {
      this.paginacao[num] = this.paginacaoOffset + num;
    }
    this.paginado(this.paginacao[0]);
    console.log(this.paginacaoOffset);
  }

  anterior() {
    if (this.paginacaoOffset > 0) {
      this.paginacaoOffset = this.paginacaoOffset - 10;
      for (const num of this.paginacao) {
        this.paginacao[num] = this.paginacaoOffset + num;
      }
      this.paginado(this.paginacao[0]);
    }
    console.log(this.paginacaoOffset);
  }
}  
