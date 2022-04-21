import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturesComponent } from './cultures.component';

describe('SpeciesComponent', () => {
  let component: CulturesComponent;
  let fixture: ComponentFixture<CulturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
