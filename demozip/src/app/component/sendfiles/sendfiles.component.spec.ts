import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendfilesComponent } from './sendfiles.component';

describe('SendfilesComponent', () => {
  let component: SendfilesComponent;
  let fixture: ComponentFixture<SendfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
