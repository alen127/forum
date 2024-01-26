import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router:Router) {}
  user: User = {};
  registerSucess=false;
  onRegister() {
    this.authService.register(this.user).subscribe(()=>{
      this.router.navigate(["login"]);
    });
  }
}
