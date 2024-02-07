import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Category } from './models/category.model';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = environment.apiUrl + '/categories';
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCategories();
  }

  // Improved initialization method
  loadCategories() {
    this.http.get<Category[]>(this.categoryUrl).subscribe({
      next: (categories) => this.categoriesSubject.next(categories),
      error: (error) => {
        console.error('Failed to get categories', error);
      },
    });
  }

  addCategory(category: Category) {
    return this.http.post<Category>(this.categoryUrl, category).pipe(
      tap(() => {
        this.loadCategories();
      }),
      catchError((error) => {
        console.error('Failed to add category', error);
        return of(null);
      })
    );
  }

  // Improved delete method with state update
  deleteCategory(id: string) {
    this.http.delete(`${this.categoryUrl}/${id}`).subscribe({
      next: () => this.loadCategories(),
      error: (error) => {
        console.error('Failed to delete category', error);
      },
    });
  }

  editCategory(id: string, category: Category) {
    this.http.patch<Category>(`${this.categoryUrl}/${id}`, category).subscribe({
      next: () => this.loadCategories(),
      error: (error) => {
        console.error('Failed to update category', error);
      },
    });
  }
}
