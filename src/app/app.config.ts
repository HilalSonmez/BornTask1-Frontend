import { ApplicationConfig,LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideEchartsCore } from 'ngx-echarts'; 
import * as echarts from 'echarts/core';//echarts/core paketindeki her şeyi al ve hepsine "echarts" adıyla erişeyim.
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {TitleComponent,TooltipComponent,LegendComponent,GridComponent} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';
/*BarChart → Sütun grafiğini kullanacağımızı söylüyor.
LineChart → Çizgi grafiğini kullanacağımızı söylüyor.
PieChart → Pasta grafiğini kullanacağımızı söylüyor.
TitleComponent → Grafik başlığı.
TooltipComponent → Üzerine gelince bilgi kutusu.
LegendComponent → Sağdaki/aşağıdaki açıklama.
GridComponent → Grafik alanı.
CanvasRenderer → Grafiği ekrana çizen motor.*/

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer
]);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    { provide: LOCALE_ID, useValue: 'tr-TR' },
    provideEchartsCore({ echarts })
  ]
};
