import { Component, Input } from '@angular/core';
import { Category } from '../models/category.model';
import { RouterLink } from '@angular/router';
import { UserPipe } from '../user.pipe';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-category-preview',
  standalone: true,
  imports: [RouterLink, UserPipe, AsyncPipe],
  templateUrl: './category-preview.component.html',
  styleUrl: './category-preview.component.css',
})
export class CategoryPreviewComponent {
  @Input() category: Category | null = null;
}
