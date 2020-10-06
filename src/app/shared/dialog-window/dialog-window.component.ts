import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent implements OnInit {
  public title: string;
  public text: string;
  public btnTrue: string;
  public btnFalse: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.text = this.data.text;
    this.btnTrue = this.data.btnTrue;
    this.btnFalse = this.data.btnFalse;
  }
}
