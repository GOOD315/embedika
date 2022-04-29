import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import { ElementsTableComponent } from './elements-table/elements-table.component';

const routes = [
  { path: 'animeCard', component: AnimeCardComponent },
  { path: 'elementsTable', component: ElementsTableComponent },
  { path: '', component: ElementsTableComponent, useAsDefault: true },
  { path: '**', component: ElementsTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
