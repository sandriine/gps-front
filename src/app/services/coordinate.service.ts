import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Coordinate} from "../model/Coordinate";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoordinateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<Coordinate[]> {
    return this.httpClient.get<Coordinate[]>('http://localhost:8080/coordinates');
  }

  create(latitude: number, longitude: number): Observable<number> {
    return this.httpClient.post<number>('http://localhost:8080/coordinates/create', {
      latitude,
      longitude
    });
  }

  delete(id: number) {
    this.httpClient.delete(`http://localhost:8080/coordinates/${id}`).subscribe();
  }

  compare(coordinate1: Coordinate, coordinate2: Coordinate, checkDistance: number): Observable<boolean> {
    return this.httpClient.post<boolean>('http://localhost:8080/coordinates/check-distance', {
      coordinate1,
      coordinate2,
      distanceToCheck: checkDistance
    });
  }
}
