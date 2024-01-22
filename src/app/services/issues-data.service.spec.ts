import { TestBed } from '@angular/core/testing';

import { IssuesDataService } from './issues-data.service';

describe('IssuesDataService', () => {
  let service: IssuesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
