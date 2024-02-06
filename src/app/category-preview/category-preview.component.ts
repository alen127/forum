import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../models/category.model';
import { RouterLink } from '@angular/router';
import { UserPipe } from '../user.pipe';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { CategoryService } from '../category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-preview',
  standalone: true,
  imports: [RouterLink, UserPipe, AsyncPipe, FormsModule],
  templateUrl: './category-preview.component.html',
  styleUrl: './category-preview.component.css',
})
export class CategoryPreviewComponent implements OnInit {
  @Input() category: Category | null = null;
  editedCategory: Category | null = null;
  userIsAdmin: boolean = false;
  isBeingEdited: boolean = false;
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.editedCategory = this.category;
    this.userIsAdmin = this.authService.isAdmin();
  }
  onDelete() {
    if (this.category && this.category._id) {
      this.categoryService.deleteCategory(this.category._id);
    }
  }
  onEdit() {
    if (this.editedCategory && this.editedCategory._id) {
      this.categoryService.editCategory(
        this.editedCategory._id,
        this.editedCategory
      );
      this.isBeingEdited = false;
    }
  }
}
