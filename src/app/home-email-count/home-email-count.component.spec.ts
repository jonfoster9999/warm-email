import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEmailCountComponent } from './home-email-count.component';

describe('HomeEmailCountComponent', () => {
  let component: HomeEmailCountComponent;
  let fixture: ComponentFixture<HomeEmailCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEmailCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEmailCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
