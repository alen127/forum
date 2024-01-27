import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = {};
  message = '';
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    this.authService.login(this.user).subscribe({
      next: () => {
        this.router.navigate(['/forum']);
      },
      error: (err) => (this.message = err.error.message),
    });
  }
}
