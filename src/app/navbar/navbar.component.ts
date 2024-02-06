import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user = new Observable<User | null>();
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.user$;
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
