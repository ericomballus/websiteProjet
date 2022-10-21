import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 1, color: 'lightblue' },
    //{ text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 2, rows: 1, color: '' },
    { text: 'Four', cols: 1, rows: 1, color: '' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
