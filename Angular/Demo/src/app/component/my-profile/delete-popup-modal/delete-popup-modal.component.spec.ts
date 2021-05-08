import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePopupModalComponent } from './delete-popup-modal.component';

describe('DeletePopupModalComponent', () => {
  let component: DeletePopupModalComponent;
  let fixture: ComponentFixture<DeletePopupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePopupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePopupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
