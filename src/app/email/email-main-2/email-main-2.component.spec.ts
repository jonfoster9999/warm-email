import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMain2Component } from './email-main-2.component';

describe('EmailMain2Component', () => {
  let component: EmailMain2Component;
  let fixture: ComponentFixture<EmailMain2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailMain2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMain2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
