import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from '../elements-table.service';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css']
})
export class AnimeCardComponent implements OnInit {

  card: Anime = new Anime();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.card.id == 0) this.LoadState();
  }

  LoadState() {
    let animeCard = localStorage.getItem('selectedAnimeCard');
    if (animeCard) this.card = JSON.parse(animeCard);
  }

  NavigateBack() {
    this.router.navigate(['elementsTable']);
  }
}
