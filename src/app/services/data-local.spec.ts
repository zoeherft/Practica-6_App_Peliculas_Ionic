import { TestBed } from '@angular/core/testing';

import { DataLocal } from './data-local';

describe('DataLocal', () => {
  let service: DataLocal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLocal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
