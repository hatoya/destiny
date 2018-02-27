import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerIndexComponent } from './player-index.component';

describe('PlayerIndexComponent', () => {
  let component: PlayerIndexComponent;
  let fixture: ComponentFixture<PlayerIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
