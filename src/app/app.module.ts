import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherModule } from './weather/weather.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsModule } from './notifications/notifications.module';
import { NewsAPiModule } from './news-api/news-api.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WeatherModule,
    HttpClientModule,
    NotificationsModule,
    NewsAPiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
