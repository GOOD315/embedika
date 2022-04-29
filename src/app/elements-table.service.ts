import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export enum AnimeType {
  unknown = "unknown",
  ANIME = "ANIME",
  MANGA = "MANGA"
}

export enum MediaFormat {
  TV = 'TV',
  TV_SHORTS = 'TV_SHORTS',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  OVA = 'OVA',
  ONA = 'ONA',
  MUSIC = 'MUSIC',
  MANGA = 'MANGA',
  NOVEL = 'NOVEL',
  ONE_SHOT = 'ONE_SHOT'
}

class MediaTitle {
  english: string = ''
}

export class Anime {
  id: number;
  type: AnimeType;
  title: MediaTitle;
  format: MediaFormat;
  description: string;

  constructor() {
    this.id = 0;
    this.type = AnimeType.ANIME;
    this.title = new MediaTitle();
    this.format = MediaFormat.TV
    this.description = ''
  }
}

@Injectable({
  providedIn: 'root'
})
export class ElementsTableService {

  data: Anime[] = [];

  constructor(public httpClient: HttpClient) { }

  GetData(page: number, perPage: number): Promise<any> {
    var query = `
    query {
      Page(page: ${page + 1}, perPage: ${perPage}) {
        pageInfo {
          total
          currentPage
        }
        media {
          id
          type
          title {
            english
          }
          format
          description
        }
      }
    }    
    `;

    var url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        })
      };

    return fetch(url, options).then(this.handleResponse)
      .then(result => {
        this.data = result.data.Page.media;
      },
        error => { this.handleError(error) })
  }

  handleResponse(response: any) {
    return response.json().then(function (json: any) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  handleError(error: any) {
    alert('Error, check console');
    console.error(error);
  }
}
