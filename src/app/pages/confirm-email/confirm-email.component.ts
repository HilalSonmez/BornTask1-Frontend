import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { ConfirmEmailResponse} from '../../models/confirm-email.model';


@Component({ //birazdan gelecek sınıf typescrıpt degıl anguların kullanıllacagı bir component
  selector: 'app-confirm-email', //bu sınıf html de hangı etıketı kullanacak
  standalone: true,//eskiden angularda her component bır module içine yazılırdı artık component kendı basına calısabılıyor
  imports: [ //componentlin kullanacagı kütüphaneler
    FormsModule, //form işlemleri için mesela <input [(ngModel)]="email"> bunu kullanmak ıcın 
    MatFormFieldModule,//Angular Material'ın <mat-form-field> etiketini kullanabilmek için.
    MatInputModule,//Material tasarımlı input kutusu sağlar.
    MatButtonModule,//Material butonları için.
    MatCardModule,//Kart görünümü oluşturur.
  ],
  templateUrl: './confirm-email.component.html', //Bu component'in HTML dosyası nerede? yani confirm-email.component.html dosyasını kullan dıyo
  styleUrl: './confirm-email.component.css', //Bu component'in CSS dosyası.dosyasındaki stilleri uygula.
})
export class ConfirmEmailComponent { // yukarıdakı componentler bu sınıfa ait ayarları verıyo export dışarı aktar yanı bu dosyanın dısındakı dosyalarda bu sınıfı kullanabılsın
  email = ''; //"Kullanıcının gireceği e-posta burada tutulacak." ilk degeri boş string c# daki public string Email { get; set; } = "";
  code = ''; //code burda tutulck"Kullanıcının girdiği bilgileri hafızada saklamak."
  constructor( //bir nesne oluşturuldugu anda calaıscaka metotdur constructor
    private http: HttpClient, //u component içinde HTTP istekleri gönderebilmek için bana HttpClient nesnesini ver." private olması bu degısken sadece component ıcınden erısılebılır
    private router: Router,//Sayfalar arasında geçiş yapmak için kullanılır.
    private snackBar: MatSnackBar, // ekrana küçük bildirimler cıkmasına yarıyor
  ) {}

  confirmEmail() { //kullanıcı butona bastıgında bu metot calısacak
    const confirmData= {//API'ye gönderilecek veriyi tutan bir nesne oluşturmak için kullanıldı. 
      //const seçilmesinin nedeni, bu değişkenin daha sonra başka bir nesneye atanmasının istenmemesidir.
      // Bu sayede kod daha güvenli ve okunabilir olur.

      email: this.email, //componenttekı emaıl degerını koy export classtan gelenı yanı
      code: this.code,
    };

    this.http //Bu adrese POST isteği gönder."
      .post<ConfirmEmailResponse>(`${environment.apiUrl}/Auth/confirm-email`, confirmData) //burdakı confırmdata gonderılecek olan verı swaggerdan gelen verı gıbı
      .subscribe({  //http yegönderdıgım istekten vrı gelınce baana haber ver
        next: (response) => { //eğer istek başarılı olursa burayı calıstır response: any backendden glen cevap
          console.log(response);

          this.snackBar.open(response.message, 'Kapat', { //this.snackBar.open küçük bildirim aç  **response.message backendden gelen mesaj 'Kapat' buton yazısı
            duration: 3000, // pop up 3 sn acık kalsın
            verticalPosition: 'top',// yukarda göstersin
            horizontalPosition: 'center', //ortada göstersın
          });

          this.router.navigate(['/login']); //istek basarılı oldu dogrulama basarılı oldu url değiştir ve logın componentını ac
        },

        error: (error) => {
          console.log(error);

          let message = 'Doğrulama başarısız';

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
