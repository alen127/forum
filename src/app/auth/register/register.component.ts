import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  user: Partial<User> = {};
  checkPassword: string = '';
  registerSucess = false;
  message = '';
  onRegister() {
    this.authService.register(this.user as User).subscribe({
      next: () => this.router.navigate(['login']),
      error: (err) => (this.message = err.error.message),
    });
  }
}
