import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from '../models/Car';

@Injectable()
export class CarService  {

    constructor(private http: HttpClient) { }

    getCars() {
    return this.http.get<any>('assets/showcase/data/cars.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
    }
}