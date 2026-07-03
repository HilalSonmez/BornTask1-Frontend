import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email = '';

constructor(
  private http: HttpClient,
  private snackBar: MatSnackBar,
  private router: Router
) {
}

sendResetCode() {
  const forgotData = {
    email: this.email
  };

  this.http.post(
    `${environment.apiUrl}/Auth/forgot-password`,
    forgotData
  ).subscribe({
    next: (response: any) => {
      this.snackBar.open(response.message, "Kapat", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });

      this.router.navigate(['/reset-password']);
    },
    error: (error) => {
      let message = "Şifre sıfırlama kodu gönderilemedi";

      if (typeof error.error === "string") {
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

      this.snackBar.open(message, "Kapat", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  });
}

}
