import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AnimalsRoutingModule } from './animals-routing.module';
import * as fromAnimal from './state/animal.reducer';
import { AnimalEffects } from './state/animal.effects';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalListContainerComponent } from './containers/animal-list-container/animal-list-container.component';
import { MessageComponent } from './components/message/message.component';
import { AnimalService } from './services/animals.service';
import { StorageService } from './services/storage.service';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalListContainerComponent,
    MessageComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    AnimalsRoutingModule,
    EffectsModule.forFeature([AnimalEffects]),
    StoreModule.forFeature(fromAnimal.animalsFeatureKey, fromAnimal.reducer),
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [AnimalService, StorageService],
})
export class AnimalsModule {}
