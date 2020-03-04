import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public USER_API = this.API + '/owners';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/owners');
  }

  get(id: string) {
    return this.http.get(this.USER_API + '/' + id);
  }

  getHref(href: string) {
    return this.http.get(href);
  }

  save(user: any): Observable<any> {
    // tslint:disable-next-line:ban-types
    let result: Observable<Object>;
    if (user['href']) {
      result = this.http.put(user.href, user);
    } else {
      result = this.http.post(this.USER_API, user);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
