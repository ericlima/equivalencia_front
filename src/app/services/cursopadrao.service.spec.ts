import { TestBed, inject } from '@angular/core/testing';

import { CursopadraoService } from './cursopadrao.service';

describe('CursopadraoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursopadraoService]
    });
  });

  it('should be created', inject([CursopadraoService], (service: CursopadraoService) => {
    expect(service).toBeTruthy();
  }));
});
