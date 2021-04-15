import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTransactionComponent } from './doc-transaction.component';

describe('DocTransactionComponent', () => {
  let component: DocTransactionComponent;
  let fixture: ComponentFixture<DocTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
