import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonPage } from './add-pokemon.page';

describe('AddPokemonPage', () => {
  let component: AddPokemonPage;
  let fixture: ComponentFixture<AddPokemonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPokemonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
