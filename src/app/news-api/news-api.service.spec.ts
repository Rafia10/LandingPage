import { TestBed } from '@angular/core/testing';

import { NewsAPiService } from './news-api.service';

describe('NewsAPiService', () => {
  let service: NewsAPiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsAPiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
