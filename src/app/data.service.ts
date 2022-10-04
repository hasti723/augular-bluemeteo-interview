import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  homes$ = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient) {}

  loadHomes(homeTypeFilters, dateTypeFilters) {
    this.homes$.next([]);
    this.httpClient
      .get<any[]>('assets/homes.json')
      .pipe(
        delay(2000),
        map((homes) => {
          if (homeTypeFilters.length) {
            return homes.filter((home) => homeTypeFilters.includes(home.type));
          } else if (dateTypeFilters.length) {
            return homes.filter((home) => dateTypeFilters.includes(home.date));
          }
          return homes;
        })
      )
      .subscribe((homes) => {
        this.homes$.next(homes);
      });
  }
}
