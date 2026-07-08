import { Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MyRecord } from '../../models/my-record.model';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CallbackDataParams } from 'echarts/types/dist/shared';
type PieTooltipParam = CallbackDataParams & {
  value: number;
  percent: number;
  dataIndex: number;
};
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule,NgxEchartsDirective,MatTabsModule, MatIconModule,],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit {
constructor(private router: Router,private http: HttpClient) {}

records: MyRecord[] = [];
barChartOptions: EChartsOption = {}; //grafıgı nasıl cizcez diye yapacagımız ayarlar ıcın gereklı
lineChartOptions: EChartsOption = {};
pieChartOptions: EChartsOption = {};

ngOnInit(): void {
  this.getRecords();
}

getRecords() {
  const token = localStorage.getItem('token');

  this.http.get<MyRecord[]>(`${environment.apiUrl}/Form/my-records`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  
  .subscribe({
    next: (response) => {
  this.records = response;

  this.barChartOptions = { //grafik ayarlarını buna esıtledk
    title: {
      text: 'Sayı Değerleri - Metin'//grafıgın baslıgı
    },
    tooltip: {// fareyı sutunun uzerıne getırınce cıkan kucuk kutu
       trigger: 'axis' ,
       formatter: (params: CallbackDataParams | CallbackDataParams[]) => {

    const items = Array.isArray(params) ? params : [params];

    const index = items[0].dataIndex;

    const record = this.records[index];

    return `
      <strong>Metin:</strong> ${record.text1}<br/>
      <strong>Sayı:</strong> ${record.num1}
    `;    
  }
 
    },

     grid: {
    left: '5%',
    right: '5%',
    bottom: '20%',
    containLabel: true
  },
    xAxis: {
      type: 'category', //grafıgın alt tarafı metın
      data: this.records.map(x => this.shortText( x.text1)),//recorddan gelen verılerden sadece text kısmını secıyoruz
       axisLabel: {
    interval: 0,
    rotate: 0
  }
    },
    yAxis: {
      type: 'value'//ust taraf deger
    },
    series: [ //veri serisi hangı verıyı cızeyım
      {
        name: 'Num1',
        type: 'bar',
        data: this.records.map(x => x.num1),//recorddan gelen degerden num ı aldık
        barMaxWidth: 40
      }
    ]
  };
  this.lineChartOptions = {
  title: {
    text: 'Sayı Değişim Grafiği',
    left: 'center'
  },
  tooltip: {
     trigger: 'axis',
  axisPointer: {
    type: 'line'
  },
    formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
    const items = Array.isArray(params) ? params : [params];

    const index = items[0].dataIndex;
    const record = this.records[index];

    return `
      <strong>Metin:</strong> ${record.text1}<br/>
      <strong>Sayı:</strong> ${record.num1}
    `;
  }
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '20%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: this.records.map(x => this.shortText(x.text1)),
    axisLabel: {
      interval: 0,
      rotate: 0
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Num1',
      type: 'line',
      data: this.records.map(x => x.num1)
    }
  ]
};
this.pieChartOptions = {
  title: {
    text: 'Sayı Dağılımı',
    left: 'center'
  },

  tooltip: {
   trigger: 'item',
   formatter: (params: CallbackDataParams | CallbackDataParams[]): string => {
    const item = Array.isArray(params)
      ? params[0] as PieTooltipParam
      : params as PieTooltipParam;

    const record = this.records[item.dataIndex];

    return `
      <strong>${record.text1}</strong><br/>
      <span>Sayı:</span> ${item.value}<br/>
      <span>Oran:</span> ${item.percent}%
    `;
  }
    
  },
    series: [
    {
      name: 'Sayı',
      type: 'pie',
      radius: '60%',
       center: ['50%', '50%'],
      label: {
        show: true,
      formatter: '{b}\n{d}%'
      },
      data: this.records.map(x => ({
        name: this.shortText(x.text1),
        value: x.num1
      }))
    }
  ]
};
},

    
  });
  
}
private readonly maxLabelLength = 15;

shortText(text: string): string {
  if (text.length <= this.maxLabelLength) {
    return text;
  }

  return text.substring(0, this.maxLabelLength) + '...';
}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
