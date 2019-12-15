import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseChallengeComponent } from './choose-challenge.component';

describe('ChooseChallengeComponent', () => {
  let component: ChooseChallengeComponent;
  let fixture: ComponentFixture<ChooseChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
