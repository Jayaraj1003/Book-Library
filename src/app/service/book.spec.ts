import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BookService } from './book';

describe('BookService', () => {
  let service: BookService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BookService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('loads books from the application assets', () => {
    service.getBooks().subscribe((books) => {
      expect(books).toEqual([]);
    });

    const request = httpTesting.expectOne('/assets/books.json');
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
