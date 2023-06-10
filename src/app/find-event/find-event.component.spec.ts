import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEventComponent } from './find-event.component';

describe('FindEventComponent', () => {
  let component: FindEventComponent;
  let fixture: ComponentFixture<FindEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindEventComponent]
    });
    fixture = TestBed.createComponent(FindEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
