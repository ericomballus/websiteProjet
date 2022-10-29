import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root',
})
export class RubriqueService {
  rubriqueArr: any;
  constructor(private http: HttpClient, private urlService: UrlService) {}

  postRubrique(data: any) {
    let url = this.urlService.getUrl();
    return this.http.post(`${url}/rubriques`, data);
  }

  remove(data: any) {
    let url = this.urlService.getUrl();
    return this.http.delete(`${url}/rubriques/${data._id}`, data._id);
  }

  getRubrique() {
    return this.http.get<any[]>(`${this.urlService.getUrl()}/rubriques`);
  }
  setRubrique(data: any[]) {
    this.rubriqueArr = data;
  }
  getR() {
    return this.rubriqueArr;
  }
}
