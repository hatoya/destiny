import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyIndexComponent } from './party-index.component';

describe('PartyIndexComponent', () => {
  let component: PartyIndexComponent;
  let fixture: ComponentFixture<PartyIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
