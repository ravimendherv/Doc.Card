import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTwoFactorAuthComponent } from './login-two-factor-auth.component';

describe('LoginTwoFactorAuthComponent', () => {
  let component: LoginTwoFactorAuthComponent;
  let fixture: ComponentFixture<LoginTwoFactorAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTwoFactorAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTwoFactorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
