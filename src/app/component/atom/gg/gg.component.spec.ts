import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GgComponent } from './gg.component';

describe('GgComponent', () => {
  let component: GgComponent;
  let fixture: ComponentFixture<GgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
