import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderDashboardComponent } from './sender-dashboard.component';

describe('SenderDashboardComponent', () => {
  let component: SenderDashboardComponent;
  let fixture: ComponentFixture<SenderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
