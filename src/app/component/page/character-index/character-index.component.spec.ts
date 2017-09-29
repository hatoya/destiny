import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterIndexComponent } from './character-index.component';

describe('CharacterIndexComponent', () => {
  let component: CharacterIndexComponent;
  let fixture: ComponentFixture<CharacterIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
