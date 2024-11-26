import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeTwitterComponent } from './fake-twitter.component';

describe('FakeTwitterComponent', () => {
  let component: FakeTwitterComponent;
  let fixture: ComponentFixture<FakeTwitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeTwitterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FakeTwitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
