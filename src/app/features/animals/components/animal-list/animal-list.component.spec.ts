import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { createMagicalMock } from 'test.helper';

import { AnimalListComponent } from './animal-list.component';

describe('AnimalListComponent', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalListComponent],
      imports: [
        MatSnackBarModule,
        MatCardModule,
        MatDividerModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;
    component.loadAnimals = createMagicalMock(EventEmitter as EventEmitter<any>);
    component.toggleAutomaticLoader = createMagicalMock(EventEmitter as EventEmitter<any>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit load animals event', () => {
    component.onLoadAnimalsClick();
    expect(component.loadAnimals.emit).toHaveBeenCalled();
  });

  it('should emit toggle automatic loader event', () => {
    component.onAutomaticLoaderChange();
    expect(component.toggleAutomaticLoader.emit).toHaveBeenCalled();
  });
});
