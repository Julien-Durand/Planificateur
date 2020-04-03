import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasFormUpdateComponent } from './repas-form-update.component';

describe('RepasFormUpdateComponent', () => {
  let component: RepasFormUpdateComponent;
  let fixture: ComponentFixture<RepasFormUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepasFormUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepasFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
