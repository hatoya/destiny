import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanIndexComponent } from './clan-index.component';

describe('ClanIndexComponent', () => {
  let component: ClanIndexComponent;
  let fixture: ComponentFixture<ClanIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClanIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
