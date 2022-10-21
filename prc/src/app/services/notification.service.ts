import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(msg: any) {
    this._snackBar.open(msg, 'OK', {
      duration: 3000,
    });
  }
}
