import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }


  error(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = ['snackbar-styles', 'background-red'];
    this.snackBar.open(message, action, config);
  }

  success(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = ['snackbar-styles', 'background-green'];
    this.snackBar.open(message, action, config);
  }
}
