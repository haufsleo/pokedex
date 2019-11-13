import { TestBed } from '@angular/core/testing';

import { PokemonHttpService } from './pokemon-http.service';

describe('PokemonHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonHttpService = TestBed.get(PokemonHttpService);
    expect(service).toBeTruthy();
  });
});
