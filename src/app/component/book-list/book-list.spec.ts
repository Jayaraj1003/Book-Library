import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { BookList } from './book-list';
import { BookService } from '../../service/book';

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookList],
      providers: [
        provideRouter([]),
        {
          provide: BookService,
          useValue: {
            getBooks: () => of([{ id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 499, inStock: true }]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays books loaded from the service', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('The Hobbit');
  });
});
