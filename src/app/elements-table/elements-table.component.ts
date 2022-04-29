import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Anime, AnimeType, ElementsTableService, MediaFormat } from '../elements-table.service';

class Filters {
  name: string = '';
  media: MediaFormat[] = [];
  type: AnimeType = AnimeType.unknown;
}

@Component({
  selector: 'app-elements-table',
  templateUrl: './elements-table.component.html',
  styleUrls: ['./elements-table.component.css']
})
export class ElementsTableComponent implements OnInit {

  constructor(public service: ElementsTableService, private router: Router) { }

  enableFilters: boolean = false;
  pageSize: number = 5;
  pageIndex: number = 0;
  selectedAnimeCard: Anime = new Anime();

  mediaFilterOptions: MediaFormat[] = [
    MediaFormat.TV,
    MediaFormat.TV_SHORTS,
    MediaFormat.MOVIE,
    MediaFormat.SPECIAL,
    MediaFormat.OVA,
    MediaFormat.ONA,
    MediaFormat.MUSIC,
    MediaFormat.MANGA,
    MediaFormat.NOVEL,
    MediaFormat.ONE_SHOT
  ]
  typeFilterOptions: AnimeType[] = [AnimeType.ANIME, AnimeType.MANGA];

  filters: Filters = new Filters();

  ngOnInit(): void {
    this.LoadState();
    if (this.service.data.length == 0) this.Refresh();
  }

  Refresh() {
    this.GetData();
  }

  GetData() {
    this.service.GetData(this.pageIndex, this.pageSize);
  }

  PaginatorChanged($event: any) {
    this.pageIndex = $event.pageIndex;
    localStorage.setItem('pageIndex', this.pageIndex.toString());
    this.service.GetData($event.pageIndex, $event.pageSize);
  }

  ShowFilters() {
    // кнопка инвертирована
    if (!this.enableFilters == false) this.ClearFilters();
    localStorage.setItem('enableFilters', (!this.enableFilters).toString());
  }

  OpenForm(animeCard: Anime) {
    this.selectedAnimeCard = animeCard;
    this.SaveState();
    if (this.enableFilters) this.SaveFilters();
    this.router.navigate(['animeCard']);
  }

  SaveState() {
    localStorage.setItem('selectedAnimeCard', JSON.stringify(this.selectedAnimeCard));
    localStorage.setItem('enableFilters', this.enableFilters.toString());
    localStorage.setItem('filters', JSON.stringify(this.filters));
    localStorage.setItem('pageIndex', this.pageIndex.toString());
  }

  LoadState() {
    let index = localStorage.getItem('pageIndex');
    if (index) this.pageIndex = parseInt(index);

    let enableFilters = localStorage.getItem('enableFilters');
    if (enableFilters) {
      this.enableFilters = JSON.parse(enableFilters);
      let filters = localStorage.getItem('filters');
      if (filters) {
        this.filters = JSON.parse(filters);
      }
    }
  }

  ClearFilters() {
    this.filters = new Filters();
    localStorage.removeItem('filters');
  }

  SaveFilters() {
    localStorage.setItem('filters', JSON.stringify(this.filters));
  }
}
