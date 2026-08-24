import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../module/books/books-module';
import { BookService } from '../../service/book';
import { Title } from '@angular/platform-browser';
import { BookList } from '../book-list/book-list';

@Component({
  imports: [CommonModule],
  selector: 'app-book-detail',
  styleUrl: './book-detail.css',
  templateUrl: './book-detail.html',
})
export class BookDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly bookService = inject(BookService);

  readonly book = signal<Book | undefined>(undefined);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id)) {
      this.isLoading.set(false);
      return;
    }

    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.book.set(books.find((book) => book.id === id));
        this.isLoading.set(false);
      },
      error: () => {
        this.book.set(undefined);
        this.isLoading.set(false);
      },
    });
  }
}
