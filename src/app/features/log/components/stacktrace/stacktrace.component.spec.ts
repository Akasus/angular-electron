import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StacktraceComponent } from './stacktrace.component';

describe('StacktraceComponent', () => {
  let component: StacktraceComponent;
  let fixture: ComponentFixture<StacktraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StacktraceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StacktraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
