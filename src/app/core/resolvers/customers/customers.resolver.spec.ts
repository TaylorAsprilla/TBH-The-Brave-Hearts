import { TestBed } from '@angular/core/testing';

import { CustomersResolver } from './customers.resolver';

describe('CustomersResolver', () => {
  let resolver: CustomersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CustomersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
