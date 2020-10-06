import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Certificate } from 'src/app/shared/interfaces';
import { CertificateService } from '../certificate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'certificate-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private certificateService: CertificateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5000)]),
      duration: new FormControl(null, [Validators.required]),
    });
  }

  submit(): void{
    if (this.form.invalid){
      return;
    }

    this.submitted = true;

    const certificate: Certificate = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      duration: this.form.value.duration
    };

    this.certificateService.create(certificate).subscribe(() => {
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
      title: 'Add certificate',
      text: `Do you want to add certificate?`,
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
      title: 'Add certificate',
      text: `The certificate was added.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}

