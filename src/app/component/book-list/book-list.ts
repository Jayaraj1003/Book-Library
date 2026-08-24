import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../module/books/books-module';
import { BookService } from '../../service/book';

@Component({
  imports: [CommonModule,RouterLink],
  selector: 'app-book-list',
  styleUrl: './book-list.css',
  templateUrl: './book-list.html',
})
export class BookList implements OnInit {
  readonly books = signal<Book[]>([]);

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books.set(books);
      },
      error: () => {
        this.books.set([]);
      },
    });
  }
}
