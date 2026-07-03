import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,
  MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {   
}
 ngOnInit() {

    const token = localStorage.getItem("token");

    if (token) {
      this.router.navigate(['/dashboard']);
    }

  }
 goToLogin() {
  this.router.navigate(['/login']);
}

goToRegister() {
  this.router.navigate(['/register']);
}

}
