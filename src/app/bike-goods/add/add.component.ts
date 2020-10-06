import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BikeGoods } from 'src/app/shared/interfaces';
import { BikeGoodsService } from '../bike-goods.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'bike-goods-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private bikeGoodsService: BikeGoodsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5000)]),
      goodsType: new FormControl(null, [Validators.required]),
    });
  }

  submit(): void{
    if (this.form.invalid){
      return;
    }

    this.submitted = true;

    const goods: BikeGoods = {
      name: this.form.value.name,
      price: this.form.value.price,
      goodsType: this.form.value.goodsType
    };

    this.bikeGoodsService.create(goods).subscribe(() => {
      this.form.reset();
      this.submitted = false;
      this.showInfoResultOperation();
    }, () => {
      this.submitted = false;
    });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Add bike goods',
      text: `Do you want to add bike goods?`,
      btnTrue: `Add`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit();
      }
    });
  }

  private showInfoResultOperation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Add bike goods',
      text: `The bike goods was added.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
