import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { CategoryService } from "../category.service";
import { CategoryPreviewComponent } from "../category-preview/category-preview.component";
import { FormsModule } from "@angular/forms";

import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { AuthService } from "../../auth/auth.service";
import { Category } from "../../shared/models/category.model";
import { User } from "../../shared/models/user.model";

@Component({
  selector: "app-forum",
  standalone: true,
  imports: [
    NavbarComponent,
    AsyncPipe,
    CategoryPreviewComponent,
    FormsModule,
    RouterOutlet,
  ],
  templateUrl: "./forum.component.html",
  styleUrl: "./forum.component.css",
})
export class ForumComponent {
  categories: Observable<Category[]>;
  isAdding: boolean = false;
  newCategory: Partial<Category> = {};
  addCategoryMessage: string = "";
  user: Observable<User | null>;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
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
        this.addCategoryMessage = err.error.message;
        console.error(err);
      },
    });
  }
}
