import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasFormComponent } from './repas-form.component';

describe('RepasFormComponent', () => {
  let component: RepasFormComponent;
  let fixture: ComponentFixture<RepasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
