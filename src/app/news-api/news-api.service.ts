import { HttpParams, HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map, switchMap, pluck } from 'rxjs/operators';

export interface Articles {
  url: string;
  title: string;
  source: {
    name: string;
  };
}
interface NewsAPiResponse {
  totalResults: number;
  articles: Articles[];
}
@Injectable({
  providedIn: 'root',
})
export class NewsAPiService {
  newsInput: Subject<number>;
  newsOutput: Observable<Articles[]>;
  numberOfPages: Subject<number>;

  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '577f135660ed46f7992db5a9d9e06125';
  private country = 'us';

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject();
    this.newsInput = new Subject();
    this.newsOutput = this.newsInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', this.pageSize)
          .set('page', page);
      }),
      switchMap((params) => {
        return this.http.get<NewsAPiResponse>(this.url, { params });
      }),
      tap((response) => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
      }),
      pluck('articles')
    );
  }

  getPage(pages: number) {
    this.newsInput.next(pages);
  }
}
