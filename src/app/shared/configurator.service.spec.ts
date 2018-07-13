import { TestBed, inject } from '@angular/core/testing';

import { ConfiguratorService } from './configurator.service';

describe('ConfiguratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorService]
    });
  });

  it('should be created', inject([ConfiguratorService], (service: ConfiguratorService) => {
    expect(service).toBeTruthy();
  }));
});
