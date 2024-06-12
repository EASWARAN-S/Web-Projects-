import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box-dialog',
  templateUrl: './confirm-box-dialog.component.html',
  styleUrls: ['./confirm-box-dialog.component.css']
})
export class ConfirmBoxDialogComponent implements OnInit {
  msg = '';
  tittle: string;

  constructor(
    public dlgref: MatDialogRef<ConfirmBoxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.msg = data[0].msg;
    this.tittle = data[0].tittle;
  }

  ngOnInit(): void {}

  submit(result: boolean): void {
    this.dlgref.close(result);
  }
}
