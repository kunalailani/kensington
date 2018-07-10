import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPropertyComponent } from './recent-property.component';

describe('RecentPropertyComponent', () => {
  let component: RecentPropertyComponent;
  let fixture: ComponentFixture<RecentPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
