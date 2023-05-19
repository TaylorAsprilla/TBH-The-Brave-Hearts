import { TestBed } from '@angular/core/testing';

import { StateResolver } from './state.resolver';

describe('StateResolver', () => {
  let resolver: StateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
