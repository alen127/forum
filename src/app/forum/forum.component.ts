import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AsyncPipe } from '@angular/common';
import { CategoryService } from '../category.service';
import { CategoryComponent } from '../category/category.component';
import { CategoryPreviewComponent } from '../category-preview/category-preview.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [NavbarComponent, AsyncPipe, CategoryPreviewComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent implements OnInit {
  categories: Observable<Category[]> = new Observable<Category[]>();

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.init();
    this.categories = this.categoryService.getCategories();
  }
}
