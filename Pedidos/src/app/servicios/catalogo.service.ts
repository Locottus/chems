import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Catalogo } from '../interfaces/Catalogo';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  cat: Array<Catalogo> = [];
  
  private behaviorSubjectCatalogo = new BehaviorSubject<Array<Catalogo>>(this.cat);
  subjectObservableCatalogo$ = this.behaviorSubjectCatalogo.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

   catalogEmitter(c: Array<Catalogo>){
    this.cat = c;
    this.behaviorSubjectCatalogo.next(c);
   }
   getCatalogo() {
    this.httpClient.get<Array<Catalogo>>('http://localhost:3000/api/catalogo')
      .subscribe(data => {
        this.cat = data;
        this.catalogEmitter(this.cat);
        console.log(this.cat)
      })
  }

}
