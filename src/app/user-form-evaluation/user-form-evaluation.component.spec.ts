import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormEvaluationComponent } from './user-form-evaluation.component';

describe('UserFormEvaluationComponent', () => {
  let component: UserFormEvaluationComponent;
  let fixture: ComponentFixture<UserFormEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
