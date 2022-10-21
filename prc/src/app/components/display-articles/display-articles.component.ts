import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articleModel';

@Component({
  selector: 'app-display-articles',
  templateUrl: './display-articles.component.html',
  styleUrls: ['./display-articles.component.scss'],
})
export class DisplayArticlesComponent implements OnInit {
  @Input() public Articles!: Article[];
  admin = 0;
  constructor() {}

  ngOnInit(): void {}
}
