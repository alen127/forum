import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { AuthService } from "../../auth/auth.service";
import { User } from "../models/user.model";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  user = new Observable<User | null>();
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = this.authService.user$;
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
