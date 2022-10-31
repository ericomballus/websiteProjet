import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Article } from '../models/articleModel';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient, private urlService: UrlService) {}

  postArticle(data: any) {
    let url = this.urlService.getUrl();
    return this.http.post(`${url}/content`, data);
  }

  postGallery(data: any) {
    let url = this.urlService.getUrl();
    return this.http.post(`${url}/gallery`, data);
  }

  removeOneArticle(data: any) {
    let url = this.urlService.getUrl();
    return this.http.delete(`${url}/content/${data._id}`, data);
  }

  getArticles() {
    return this.http.get<Article[]>(`${this.urlService.getUrl()}/content`);
  }
}
