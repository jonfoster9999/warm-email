import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFollowUpsComponent } from './manage-follow-ups.component';

describe('ManageFollowUpsComponent', () => {
  let component: ManageFollowUpsComponent;
  let fixture: ComponentFixture<ManageFollowUpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFollowUpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFollowUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
