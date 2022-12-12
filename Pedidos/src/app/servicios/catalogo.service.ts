import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Catalogo } from '../interfaces/Catalogo';
import { Constantes } from '../interfaces/Constantes';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  cat: Array<Catalogo> = [];

  private behaviorSubjectCatalogo = new BehaviorSubject<Array<Catalogo>>(this.cat);
  subjectObservableCatalogo$ = this.behaviorSubjectCatalogo.asObservable();

  constructor(
    private httpClient: HttpClient,
    private constantes:Constantes,

  ) { }

  catalogEmitter(c: Array<Catalogo>) {
    this.cat = c;
    this.behaviorSubjectCatalogo.next(this.cat);
  }

  getCatalogo() {
    this.httpClient.get<Array<Catalogo>>(`${this.constantes.backend}catalogo`)
      .subscribe(data => {
        this.cat = data;
        this.cat.forEach(e => { e.cantidad = 0; })
        this.catalogEmitter(this.cat);
      })
  }

  actualizaCatalogo(catalogo: Array<Catalogo>) {
    this.httpClient.put(`${this.constantes.backend}catalogo`, catalogo).subscribe(data =>{
      alert(data);
    });
  }

  insertaCatalogo(catalogo: Catalogo) {
    this.httpClient.post(`${this.constantes.backend}catalogo`, catalogo).subscribe(data =>{
      alert(data);
    });
  }


}
