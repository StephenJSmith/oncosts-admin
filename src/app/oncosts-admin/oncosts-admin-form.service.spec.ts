import { TestBed } from '@angular/core/testing';

import { OncostsAdminFormService } from './oncosts-admin-form.service';

describe('OncostsAdminFormService', () => {
  let service: OncostsAdminFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OncostsAdminFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
