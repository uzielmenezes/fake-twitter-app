import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFrameComponent } from './login-frame.component';

describe('LoginFrameComponent', () => {
  let component: LoginFrameComponent;
  let fixture: ComponentFixture<LoginFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
