import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CategoryService } from '../category.service';
import { FormsModule } from '@angular/forms';
import { UserPipe } from '../../shared/user.pipe';
import { Category } from '../../shared/models/category.model';
import { AuthService } from '../../auth/auth.service';

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
    this.userIsAdmin = this.authService.isAdmin();
  }
  onDelete() {
    if (this.category && this.category._id) {
      this.categoryService.deleteCategory(this.category._id);
    }
  }
  onBeginEdit() {
    if (this.category && !this.editedCategory) {
      this.editedCategory = { ...this.category };
    }
    this.isBeingEdited = !this.isBeingEdited;
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
