import { TestBed, inject } from '@angular/core/testing';

import { IesService } from './ies.service';

describe('IesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IesService]
    });
  });

  it('should be created', inject([IesService], (service: IesService) => {
    expect(service).toBeTruthy();
  }));
});
