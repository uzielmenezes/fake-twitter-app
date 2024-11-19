import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccFrameComponent } from './create-acc-frame.component';

describe('CreateAccFrameComponent', () => {
  let component: CreateAccFrameComponent;
  let fixture: ComponentFixture<CreateAccFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
