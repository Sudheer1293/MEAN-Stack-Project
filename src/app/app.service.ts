import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from './shared/model';
import { Router } from '@angular/router';
import { Stats } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private token: string;
  authStatus$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getToken() {
    return this.token;
  }

  getContactDetails(params: string = ''):Observable<Contact[]> {
    let searchParams = new HttpParams();
    if(params != '') {
      searchParams = searchParams.set('text', params);
    }
    
    return this.http.get<Contact[]>("http://localhost:3000/summary", { params: searchParams } );  // { params: { name: "ds" } }
  }

  login(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/users/login", authData)
      .subscribe(response => {
        const authToken = response.token;
        const now = new Date();
        console.log(now)
        const expiresIn = new Date(now.getTime() + (response.expiresIn)*1000);
        console.log(authToken)
        if(authToken) {
          this.token = authToken;
          this.authStatus$.next(true);
          this.setAuthorizationData(authToken, expiresIn);
          this.router.navigate(['/summary']);
        }      
      });
  }

  logout() {
    this.authStatus$.next(false);
    this.removeAuthorizationData();
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const { token , expiresIn } = this.getAuthorizationData();
    const isTokenExpired = new Date(expiresIn).getTime() - new Date().getTime();
    if(!(isTokenExpired > 0)) {
      this.router.navigate(['/login']);
      return;
    }
    this.token = token;
    this.authStatus$.next(true);
    this.router.navigate(['/summary']);
  }

  setAuthorizationData(token, expiresIn) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authExpiresIn', expiresIn);
    console.log(expiresIn.toISOString())
  }

  removeAuthorizationData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authExpiresIn');
  }

  getAuthorizationData() {
    const token = localStorage.getItem('authToken');
    const expiresIn = localStorage.getItem('authExpiresIn');

    return {
      token: token,
      expiresIn: expiresIn,
    }
  }

  uploadFile(formData) {
    this.http.post("http://localhost:3000/uploadFile", formData)
      .subscribe(staus => {
        console.log("File uploaded")
      });
  }
}
