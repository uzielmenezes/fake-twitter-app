import {TestBed} from '@angular/core/testing';

import {LoginSignService} from './login-sign.service';

describe('LoginSignService', () => {
  let service: LoginSignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
