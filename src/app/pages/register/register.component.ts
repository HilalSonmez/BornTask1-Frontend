import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  register() {
    const registerData = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post('https://localhost:7183/api/Auth/register', registerData)
      .subscribe({
        next: (response: any) => {
          console.log(response);

          this.snackBar.open(response.message, 'Kapat', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });

          this.router.navigate(['/confirm-email']);
        },
        error: (error) => {
          console.log(error);

          let message = 'Kayıt işlemi başarısız';

          if (typeof error.error === 'string') {
            message = error.error;
          }

          if (error.error?.message) {
            message = error.error.message;
          }

          if (error.error?.errors) {
            const errors = error.error.errors;
            const firstKey = Object.keys(errors)[0];
            message = errors[firstKey][0];
          }

          this.snackBar.open(message, 'Kapat', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
      });
  }
}
