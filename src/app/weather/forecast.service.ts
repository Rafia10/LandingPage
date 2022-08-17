import { Injectable } from '@angular/core';
import {
  map,
  switchMap,
  mergeMap,
  toArray,
  share,
  tap,
  catchError,
  retry,
} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { NotificationsServiceService } from '../notifications/notifications-service.service';

export interface openweatherRespnse {
  list: [
    {
      dt_txt: string;
      main: {
        temp: number;
      };
    }
  ];
}
@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(
    private http: HttpClient,
    private notifications: NotificationsServiceService
  ) {}
  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', '02a81b52bbcf3523c580143f1359f8b3');
      }),
      switchMap((params) =>
        this.http.get<openweatherRespnse>(this.url, { params })
      ),

      map((response) => {
        return response.list.filter((value, index) => index % 8 === 0);
      }),
      mergeMap((value) => of(...value)),
      map((value) => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
        };
      }),
      toArray(),
      share()
    );
  }
  getCurrentLocation() {
    console.log('Trying to get location');
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
          console.log(position);
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(2),
      tap(
        () => {
          this.notifications.addSuccess('Got your location');
        },
        () => {
          this.notifications.addError('Failed to get your location');
        }
      )
    );
  }
}
