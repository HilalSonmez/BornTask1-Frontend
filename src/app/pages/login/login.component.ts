import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; //kullanacağım şeylerın importunu burada yapıyorum
import { HttpClient } from '@angular/common/http'; //backende istek atma
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router,RouterLink} from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule,RouterLink], //kullanmak istediğim şeyleri buraya ekliyorum
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = ''; //email bilgisini tutacak değişken

  password = ''; //password bilgisini tutacak değişken

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post(`${environment.apiUrl}/Auth/login`, loginData) //Backende post isteği at
      .subscribe({
        //backendden cevap gelınce çalıs
        next: (response: any) => {
          localStorage.setItem('token', response.token); //gelen tokenı kaydet bunu aynı cıhazdan 24 saat ıcınde logın ıstememe işi için yaptık
          this.snackBar.open(response.message, 'Kapat', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          //hata gelırse
          console.log(error);
          let message = 'Giriş başarısız';

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

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
