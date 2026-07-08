import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MyRecord } from '../../models/my-record.model'; //modeli burda kullanmak ıstıyorum
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-records',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule, RouterLink, MatTableModule,MatIconModule],
  templateUrl: './my-records.component.html',
  styleUrl: './my-records.component.css'
})
export class MyRecordsComponent implements OnInit {
  displayedColumns: string[] = ['text1', 'num1', 'date1'];
constructor(private http: HttpClient,
    private router: Router
) {}
logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
ngOnInit(): void {
    this.getMyRecords();
}
records: MyRecord[]=[]  //tip güvenliği için gelen verı ıcın ınterface yazdık onu burda kullandık                              

//any[] = []; //backendden gelen verılerı kyacak yer lazım record adında bos bır lıste olsun
                                                                       // any içine her tip veri gelebilir anlamında
getMyRecords() {
  const token = localStorage.getItem('token'); //login olurken kaydettıgımız tokenı al

  this.http.get<MyRecord[]>(`${environment.apiUrl}/Form/my-records`, {
    headers: {
      Authorization: `Bearer ${token}` //backende gırıs yaptım tokenım bu dıye goster
    }
  })
  
  .subscribe({
    next: (response) => { // myrecordu gelen ıstekte tanımladıgımız için dönecek tip bellı anyı kaldırdık dırek response donduk
     this.records=response;
    },
    error: (error) => {
      console.log(error);
    }
  });
  
}
}

