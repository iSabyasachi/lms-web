import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8000/api/books';
  constructor(private httpClient: HttpClient) { }

  getBookList(type: string | null): Observable<Book[]> {
    // need to build URL based on category type 
    const searchUrl = `${this.baseUrl}/search/findByType?type=${type}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.book)
    );
  }
}

interface GetResponse {
  _embedded: {
    book: Book[];
  }
}
