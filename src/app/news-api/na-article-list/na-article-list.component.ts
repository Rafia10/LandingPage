import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Articles, NewsAPiService } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css'],
})
export class NaArticleListComponent implements OnInit {
  articles: Articles[];
  constructor(private newsApiService: NewsAPiService) {
    this.newsApiService.newsOutput.subscribe((articles) => {
      this.articles = articles;
      console.log(this.articles);
    });
    this.newsApiService.getPage(1);
  }
  change(page?: any): void {
    this.newsApiService.getPage(page);
  }

  ngOnInit(): void {}
}
