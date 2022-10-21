import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visitor } from '../models/visitorModel';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  constructor(private http: HttpClient, private urlService: UrlService) {}

  postVisitor(visitor: Visitor) {
    let url = this.urlService.getUrl();
    return this.http.post(`${url}/visitor`, visitor);
  }
}
