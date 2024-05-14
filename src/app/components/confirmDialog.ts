import { Component, INJECTOR, Inject, Input, input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <!-- <h2 mat-dialog-title>Delete Employee</h2> -->
    <h2 mat-dialog-title>{{ title }}</h2>
    <mat-dialog-content>
      <!-- Would you like to delete this user? -->
      <!-- Confirming will delete user only logically. -->
      {{ message }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">No</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent], //,MatButtonModule,
})
export class ConfirmDialog {
  message = '';
  title = '';
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message;
    this.title = data.title;
  }
}
