import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  public categories = new Observable<Category[]>();
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.init();
    this.categories = this.categoryService.getCategories();
  }
}
