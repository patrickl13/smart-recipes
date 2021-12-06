import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../app/reusable/confirm-dialog/confirm-dialog.component';
import {ConfirmDialog} from '../models/misc.model';

@Injectable({
  providedIn: 'root'
})

export class ConfirmDialogService {
  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  public open(options: ConfirmDialog): void {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}
