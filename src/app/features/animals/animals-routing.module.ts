import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalListContainerComponent } from './containers/animal-list-container/animal-list-container.component';

const routes: Routes = [{ path: '', component: AnimalListContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalsRoutingModule {}
