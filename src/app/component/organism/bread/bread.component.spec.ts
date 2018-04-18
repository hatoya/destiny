import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadComponent } from './bread.component';

describe('BreadComponent', () => {
  let component: BreadComponent;
  let fixture: ComponentFixture<BreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
