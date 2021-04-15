import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedDocumentComponent } from './received-document.component';

describe('ReceivedDocumentComponent', () => {
  let component: ReceivedDocumentComponent;
  let fixture: ComponentFixture<ReceivedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
