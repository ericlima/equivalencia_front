import { TestBed, inject } from '@angular/core/testing';

import { DisciplinapadraoService } from './disciplinapadrao.service';

describe('DisciplinapadraoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisciplinapadraoService]
    });
  });

  it('should be created', inject([DisciplinapadraoService], (service: DisciplinapadraoService) => {
    expect(service).toBeTruthy();
  }));
});
