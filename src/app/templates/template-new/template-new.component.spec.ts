import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNewComponent } from './template-new.component';

describe('TemplateNewComponent', () => {
  let component: TemplateNewComponent;
  let fixture: ComponentFixture<TemplateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
