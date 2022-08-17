import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsAPiService } from 'src/app/news-api/news-api.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  @Output() changePage = new EventEmitter<any>();
  numberOfPages: number = 5;

  pageOptions: number[]; //hold all possible pages
  currentPage = 1;
  constructor(private newsAPi: NewsAPiService) {
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter(
      (pageNumber) => pageNumber >= 1 && pageNumber <= this.numberOfPages
    );
  }
  change(page?: any): void {
    typeof page == 'number' ? this.changePage.emit(page) : null;
  }
  setPrev(): void {
    this.currentPage = this.currentPage - 1;
    this.newsAPi.getPage(this.currentPage);
  }
  setNext(): void {
    this.currentPage = this.currentPage + 1;
    this.newsAPi.getPage(this.currentPage);
  }

  ngOnInit(): void {}
}
