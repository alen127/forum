import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @Input() category: Category | null = null;
}
