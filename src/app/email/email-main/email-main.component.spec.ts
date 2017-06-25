import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMainComponent } from './email-main.component';

describe('EmailMainComponent', () => {
  let component: EmailMainComponent;
  let fixture: ComponentFixture<EmailMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
