import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('head', { static: false }) header!: ElementRef;
  form: FormGroup;
  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    let header: any = document.getElementById('header');
    let footer: any = document.getElementById('footer');
    header.style.display = 'none';
    footer.style.display = 'none';
  }

  connect() {
    this.userService.login(this.form.value).subscribe(
      (res) => {
        let header: any = document.getElementById('header');
        let footer: any = document.getElementById('footer');
        this.router.navigate(['/dashboard']);
        header.style.display = 'block';
        footer.style.display = 'block';
      },
      (err: HttpErrorResponse) => {
        this.openSnackBar(err.error);
      }
    );
  }

  openSnackBar(msg: any) {
    this._snackBar.open(msg, 'OK', {
      duration: 3000,
    });
  }
}
