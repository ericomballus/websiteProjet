import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/articleModel';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  Articles!: Article[];
  constructor(private router: Router, private contentService: ContentService) {}

  ngOnInit(): void {
    this.getArticlesList();
  }
  addArticles() {
    this.router.navigate(['post', 'post-edit']);
  }
  getArticlesList() {
    this.contentService.getArticles().subscribe((arr) => {
      this.Articles = arr;
    });
  }
  removeArticle(a: Article) {
    this.contentService.removeOneArticle(a).subscribe((res) => {
      this.Articles = this.Articles.filter((art) => art._id !== a._id);
    });
  }
}
