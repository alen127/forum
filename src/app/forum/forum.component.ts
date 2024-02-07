import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { AsyncPipe } from '@angular/common';
import { CategoryService } from '../category.service';
import { CategoryPreviewComponent } from '../category-preview/category-preview.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    NavbarComponent,
    AsyncPipe,
    CategoryPreviewComponent,
    FormsModule,
    RouterOutlet,
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent {
  categories: Observable<Category[]>;
  isAdding: boolean = false;
  newCategory: Partial<Category> = {};
  addCategoryMessage: string = '';
  user: Observable<User | null>;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {
    this.categories = categoryService.categories$;
    this.user = authService.user$;
  }

  onSubmit() {
    this.user.subscribe({
      next: (user) => {
        if (user && user._id) {
          this.newCategory.user_id = user._id;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.categoryService.addCategory(this.newCategory as Category).subscribe({
      next: () => {
        this.isAdding = false;
        this.newCategory = {};
      },
      error: (err) => {
        this.addCategoryMessage = 'Failed to add category';
        console.error(err);
      },
    });
  }
}
