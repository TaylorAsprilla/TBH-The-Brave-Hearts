import { TestBed } from '@angular/core/testing';

import { AgentsResolver } from './agents.resolver';

describe('AgentsResolver', () => {
  let resolver: AgentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AgentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
