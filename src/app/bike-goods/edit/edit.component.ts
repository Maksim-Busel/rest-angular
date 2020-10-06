import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeGoods } from 'src/app/shared/interfaces';
import { BikeGoodsService } from '../bike-goods.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'bike-goods-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  bikeGoods: BikeGoods;
  submitted = false;

  constructor(private bikeGoodsService: BikeGoodsService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    const bikeGoodsId = this.activeRoute.params['_value']['id'];
    this.bikeGoodsService.getById(bikeGoodsId).subscribe(data => {
      this.bikeGoods = data;
      this.form = new FormGroup({
      id: new FormControl(this.bikeGoods.id, [Validators.required]),
      name: new FormControl(this.bikeGoods.name.trim(), [Validators.required]),
      price: new FormControl(this.bikeGoods.price, [Validators.required, Validators.min(0), Validators.max(5000)]),
      goodsType: new FormControl(this.bikeGoods.goodsType, [Validators.required]),
    });
    });
  }

  submit(): void {
    if (this.form.invalid){
      return;
    }

    this.submitted = true;

    const bikeGoods: BikeGoods = {
      id: this.bikeGoods.id,
      name: this.form.value.name,
      price: this.form.value.price,
      goodsType: this.form.value.goodsType
    };

    this.bikeGoodsService.update(bikeGoods).subscribe(res => {
      this.form.reset();
      this.submitted = false;
      this.showInfoResultOperation();
      this.router.navigate(['/bike-goods', 'dashboard']);
    }, () => {
      this.submitted = false;
    });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Edit bike goods',
      text: `Do you want to update this bike goods?`,
      btnTrue: `Update`,
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
      title: 'Update bike goods',
      text: `The bike goods was updated.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
