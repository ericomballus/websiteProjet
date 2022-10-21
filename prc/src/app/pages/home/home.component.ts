import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/articleModel';
import { Visitor } from 'src/app/models/visitorModel';
import { ContentService } from 'src/app/services/content.service';
import { IpService } from 'src/app/services/ip.service';
import { UrlService } from 'src/app/services/url.service';
import { UserService } from 'src/app/services/user.service';
import { VisitorService } from 'src/app/services/visitor.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showCarousel = true;
  images = [];
  videoUrl!: any;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  Articles!: Article[];
  constructor(
    private ipService: IpService,
    private visitorService: VisitorService,
    private userService: UserService,
    private router: Router,
    private contentService: ContentService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    //this.getClientIpAddress();
    this.getArticlesList();
  }
  getArticlesList() {
    this.contentService.getArticles().subscribe((arr) => {
      arr.forEach((a) => {
        a.imageUrl = `${this.urlService.getUrl()}/content/${a._id}`;
        a.videoUrl = `${this.urlService.getUrl()}/content/video/${a._id}`;
      });

      this.Articles = arr;
      if (arr[0].videoUrl) {
        this.videoUrl = arr[0].videoUrl;
        console.log(this.videoUrl);
      }
    });
  }
  displayVideo(article: Article) {
    if (article.videoUrl) {
      this.videoUrl = article.videoUrl;
    }
  }
  openPicker() {
    this.showCarousel = !this.showCarousel;
  }

  getClientIpAddress() {
    this.ipService.getUserIpAddress().subscribe(
      (res: any) => {
        console.log('ip adress', res);
        if (res) {
          let visitor: Visitor = {};
          visitor.visitorIP = res['ip_address'];
          visitor.moreInfo = res;
          this.saveVisitor(visitor);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveVisitor(visitor: Visitor) {
    this.visitorService.postVisitor(visitor).subscribe(
      (data) => {
        this.userService.saveToken(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
