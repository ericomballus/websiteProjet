import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RubriqueService } from 'src/app/services/rubriques/rubrique.service';

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.scss'],
})
export class RubriqueComponent implements OnInit {
  rubriqueArr: any[] = [];
  constructor(
    private router: Router,
    private rubriqueService: RubriqueService
  ) {}

  ngOnInit(): void {
    this.getRubriqueList();
  }
  addRubrique() {
    this.router.navigate(['rubrique', 'rubrique-add']);
  }
  getRubriqueList() {
    this.rubriqueService.getRubrique().subscribe((arr) => {
      console.log(arr);
      this.rubriqueArr = arr;
    });
  }
  deleteRubrique(r: any) {
    this.rubriqueService.remove(r).subscribe((arr) => {
      console.log(arr);
      this.rubriqueArr = this.rubriqueArr.filter((ru) => ru._id !== r._id);
    });
  }
}
