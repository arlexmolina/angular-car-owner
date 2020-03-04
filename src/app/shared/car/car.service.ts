import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public CAR_API = this.API + '/cars';
  cars: Array<any>;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/cool-cars');
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }

  save(car: any): Observable<any> {
    // tslint:disable-next-line:ban-types
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.CAR_API, car);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

  // tslint:disable-next-line:ban-types
  removeOwner(dni: String) {
    this.getAll().subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        // tslint:disable-next-line:no-conditional-assignment triple-equals
        if (car.ownerDni == dni) {
          car.ownerDni = null;
          this.save(car).subscribe(result => {
            console.log('Borrado: ');
            console.log(car);
          }, error => console.error(error));
        }
      }
    });
  }
}
