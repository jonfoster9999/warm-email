import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAddComponent } from './email-add.component';

describe('EmailAddComponent', () => {
  let component: EmailAddComponent;
  let fixture: ComponentFixture<EmailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
