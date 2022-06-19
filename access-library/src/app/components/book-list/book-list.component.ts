import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list-grid.component.html',
  //templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  currentCategoryType: string | null;

  constructor(private bookService: BookService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  listBooks() {
    // check if "id" parameter is available
    const hasCategoryType: boolean = this.route.snapshot.paramMap.has('type');

    if (hasCategoryType) {
      // get the "type" param string.
      this.currentCategoryType = this.route.snapshot.paramMap.get('type');
    }
    else {
      // not category book available ... default to category type book
      this.currentCategoryType = "book";
    }

    this.bookService.getBookList(this.currentCategoryType).subscribe(
      data => {
        console.log(data);
        this.books = data;
      }
    )
  }

}
