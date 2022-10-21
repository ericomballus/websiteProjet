import { TestBed } from '@angular/core/testing';

import { SaveRandomService } from './save-random.service';

describe('SaveRandomService', () => {
  let service: SaveRandomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveRandomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
