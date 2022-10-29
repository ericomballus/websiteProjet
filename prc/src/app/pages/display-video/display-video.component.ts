import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
  styleUrls: ['./display-video.component.scss'],
})
export class DisplayVideoComponent implements OnInit {
  @Input() public videoUrl!: string;
  @Input() public imageUrl!: string;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.imageUrl);
      // console.log(this.videoUrl);
    }, 1000);
  }
  swapVideo() {}
}
