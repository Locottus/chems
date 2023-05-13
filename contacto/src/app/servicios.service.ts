import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Mensaje } from './dto/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  API_URL: string = "http://servicexxx";

  constructor(
    private http: HttpClient,
  ) { }


  enviarEmail(msg: Mensaje) {
    return this.http
      .post(`${this.API_URL}`, msg)
      .pipe(catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        alert(err.message);
        return throwError(() => err);
      }));
  }


}
