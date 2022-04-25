import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Reservation } from '../model/reservation.model';
import { ResortInfo } from '../model/resort-info.model';
import { Resort } from '../model/resort.model';
import { SkiPass } from '../model/ski-pass.model';
import { Track } from '../model/track.model';
import { Weather } from '../model/weather';

const baseURL = "http://localhost:3000/api/skiresorts"

@Injectable({
  providedIn: 'root'
})
export class ResortService {

  constructor(private http: HttpClient) { }

  getInfo(): Observable<ResortInfo[]> {
    return this.http.get(baseURL).pipe(map((data: any) => {
      return data && data.map((elem: any) => new ResortInfo(elem)) || []
    }))
  }

  getResort(resortId: number): Observable<Resort> {
    return this.http.get(`${baseURL}/${resortId}`).pipe(map((data: any) => {
      return new Resort(data);
    }))
  }

  getWeather(id: number): Observable<Weather[]> {
    return this.http.get<Array<Weather>>(baseURL + "/" + id + "/weather").pipe(map(res => {
      let retVal = new Array<Weather>();
      res.forEach(elem => retVal.push(new Weather(elem)));
      return retVal;
    }));
  }

  getTracks(resortId: number, params?: any): Observable<Track[]> {
    let queryParams = {};
    if (params) {
      queryParams = {
        params: new HttpParams()
        .set('sort', params.sort || "")
      }
    }
    return this.http.get(`${baseURL}/${resortId}/tracks`, queryParams).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Track(elem)) || []
    }))
  }

  getSkiPass(resortId: number) {
    return this.http.get(`${baseURL}/${resortId}/skipass`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new SkiPass(elem)) || []
    }))
  }

  postReservation(resortId: number, reservation: any): Observable<Reservation> {
    return this.http.post(`${baseURL}/${resortId}/skipass`, reservation).pipe(map((data: any) => new Reservation(data)))
  }
}
