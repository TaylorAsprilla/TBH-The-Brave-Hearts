import { TestBed } from '@angular/core/testing';

import { AgentResolver } from './agent.resolver';

describe('AgentResolver', () => {
  let resolver: AgentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AgentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
