import { TestBed, inject } from '@angular/core/testing';

import { DisciplinaService } from './disciplina.service';

describe('DisciplinaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisciplinaService]
    });
  });

  it('should be created', inject([DisciplinaService], (service: DisciplinaService) => {
    expect(service).toBeTruthy();
  }));
});
