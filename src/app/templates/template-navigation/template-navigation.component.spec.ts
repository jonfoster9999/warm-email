import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNavigationComponent } from './template-navigation.component';

describe('TemplateNavigationComponent', () => {
  let component: TemplateNavigationComponent;
  let fixture: ComponentFixture<TemplateNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
