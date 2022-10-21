import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
  styleUrls: ['./display-video.component.scss'],
})
export class DisplayVideoComponent implements OnInit {
  @Input() public videoUrl!: string;
  constructor() {}

  ngOnInit(): void {}
  swapVideo() {}
}
