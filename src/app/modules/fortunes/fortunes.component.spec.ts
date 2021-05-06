import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FortunesComponent } from './fortunes.component';

describe('FortunesComponent', () => {
  let component: FortunesComponent;
  let fixture: ComponentFixture<FortunesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FortunesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FortunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
