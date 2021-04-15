import { TestBed } from '@angular/core/testing';

import { CustomCommonService } from './custom-common.service';

describe('CustomCommonService', () => {
  let service: CustomCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
