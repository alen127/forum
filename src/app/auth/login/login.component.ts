import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: Partial<User> = {};
  message = '';
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    this.authService.login(this.user as User).subscribe({
      next: () => {
        this.router.navigate(['forum']);
      },
      error: (err) => (this.message = err.error.message),
    });
  }
}
