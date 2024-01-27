import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Category } from './models/category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = environment.apiUrl + '/categories';
  private categorySubject = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {}

  public init() {
    return this.http
      .get(this.categoryUrl)
      .subscribe((categories: any) => this.categorySubject.next(categories));
  }
  public getCategories() {
    return this.categorySubject.asObservable();
  }
}
