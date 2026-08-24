import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { BookDetail } from './book-detail';
import { BookService } from '../../service/book';

describe('BookDetail', () => {
  let component: BookDetail;
  let fixture: ComponentFixture<BookDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } },
        },
        {
          provide: BookService,
          useValue: {
            getBooks: () => of([{ id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 499, inStock: true }]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the book selected by the route id', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('The Hobbit');
    expect(fixture.nativeElement.textContent).toContain('J.R.R. Tolkien');
  });
});
