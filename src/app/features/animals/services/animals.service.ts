/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimalView } from '../models/animal-view.model';

@Injectable()
export class AnimalService {
  constructor(private http: HttpClient) {}

  public FindAllAnimals(since: number, page: number): Observable<AnimalView[]> {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    return this.http
      .get(`/api/elephants`, httpOptions)
      .pipe(map((result) => Object.values(result).map((item: any) => ({ ...item, id: item._id }))));
  }
}
