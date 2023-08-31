import { TestBed } from '@angular/core/testing';

import { EnviarValorService } from './enviar-valor.service';

describe('EnviarValorServiceTsService', () => {
  let service: EnviarValorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarValorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
