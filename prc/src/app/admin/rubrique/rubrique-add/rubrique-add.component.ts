import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RubriqueService } from 'src/app/services/rubriques/rubrique.service';

@Component({
  selector: 'app-rubrique-add',
  templateUrl: './rubrique-add.component.html',
  styleUrls: ['./rubrique-add.component.scss'],
})
export class RubriqueAddComponent implements OnInit {
  form: FormGroup;
  level: number = 0;
  parentId: any = null;
  rubriqueArr: any[] = [];
  constructor(
    public fb: FormBuilder,
    private rubriqueService: RubriqueService
  ) {
    this.form = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.getRubriqueList();
  }

  getRubriqueList() {
    this.rubriqueService.getRubrique().subscribe((arr: any[]) => {
      console.log(arr);
      this.rubriqueArr = arr;
    });
  }

  saveRubrique() {
    console.log(this.form);
    let ru = {
      name: this.form.value.name,
      level: this.level,
      parentId: this.parentId,
    };
    this.rubriqueService.postRubrique(ru).subscribe((res) => {
      // this.level= 0
      // this.parentId
      this.rubriqueArr.unshift(res);
    });
  }

  getParent(ev: any) {
    console.log(ev);

    let selectedValues = Array.apply(null, ev.options)
      .filter((option: any) => option.selected)
      .map((option: any) => option.value);
    let id = selectedValues[0];
    console.log(id);
  }
  getLevel(ev: any) {
    let selectedValues = Array.apply(null, ev.options)
      .filter((option: any) => option.selected)
      .map((option: any) => option.value);
    let id = selectedValues[0];
    console.log(id);
    this.level = parseInt(id);
  }
}
