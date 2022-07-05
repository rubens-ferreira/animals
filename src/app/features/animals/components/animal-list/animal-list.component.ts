import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnimalView } from '../../models/animal-view.model';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalListComponent implements OnChanges {
  @Input() animals: AnimalView[] = [];

  @Input() automaticLoaderEnabled: boolean = false;

  @Output() loadAnimals: EventEmitter<any> = new EventEmitter<any>();

  @Output() toggleAutomaticLoader: EventEmitter<any> = new EventEmitter<any>();

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'name', 'image'];

  constructor() {
    this.dataSource.data = this.animals ?? [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animals']) {
      this.dataSource.data = this.animals;
    }
  }

  onLoadAnimalsClick() {
    this.loadAnimals.emit();
  }

  onAutomaticLoaderChange() {
    this.toggleAutomaticLoader.emit();
  }
}
