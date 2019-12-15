import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExerciseComponent } from './exercise.component';

describe('ExerciseComponent', () => {
  let component: AdminExerciseComponent;
  let fixture: ComponentFixture<AdminExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
