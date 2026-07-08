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
import { ResetPasswordResponse } from '../../models/reset-password.model';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email = '';
code = '';
newPassword = '';

constructor(
  private http: HttpClient,
  private snackBar: MatSnackBar,
  private router: Router
) {
}

resetPassword() {

  const resetData = {
    email: this.email,
    code: this.code,
    newPassword: this.newPassword
  };

  this.http.post<ResetPasswordResponse>(
   `${environment.apiUrl}/Auth/reset-password`,
    resetData
  ).subscribe({
    next: (response) => {

      this.snackBar.open(response.message, "Kapat", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });

      this.router.navigate(['/login']);
    },

    error: (error) => {

      let message = "Şifre güncellenemedi";

      if (typeof error.error === "string") {
        message = error.error;
      }
      if (error.error?.errors) {
    const errors = error.error.errors;
    const firstKey = Object.keys(errors)[0];
    message = errors[firstKey][0];
  }

      if (error.error?.message) {
        message = error.error.message;
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
