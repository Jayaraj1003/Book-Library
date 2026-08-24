import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BookList } from './component/book-list/book-list';
import { BookDetail } from './component/book-detail/book-detail';

export const routes: Routes = [
  { path: 'book', component: BookList },
  { path: 'book/:id', component: BookDetail },
  { path: '', pathMatch: 'full', redirectTo: 'book' },
  { path: '**', redirectTo: 'book' },
];
