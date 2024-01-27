import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  user: User = {};
  registerSucess = false;
  message = '';
  onRegister() {
    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['login']),
      error: (err) => (this.message = err.error.message),
    });
  }
}
