import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate } from 'src/app/shared/interfaces';
import { CertificateService } from '../certificate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';


@Component({
  selector: 'certificate-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  certificate: Certificate;
  submitted = false;

  constructor(private certificateService: CertificateService,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const certificateId = this.activeRoute.params['_value']['id'];
    this.certificateService.getById(certificateId).subscribe(data => {
      this.certificate = data;
      this.form = new FormGroup({
      id: new FormControl(this.certificate.id, [Validators.required]),
      name: new FormControl(this.certificate.name, [Validators.required]),
      description: new FormControl(this.certificate.description, [Validators.required]),
      price: new FormControl(this.certificate.price, [Validators.required, Validators.min(0), Validators.max(5000)]),
      duration: new FormControl(this.certificate.duration, [Validators.required]),
      dateCreation: new FormControl(this.certificate.dateCreation, [Validators.required]),
      dateModification: new FormControl(this.certificate.dateModification),
    });
    });
  }

  submit(): void {
    if (this.form.invalid){
      return;
    }

    this.submitted = true;

    const certificate: Certificate = {
      id: this.certificate.id,
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      duration: this.form.value.duration,
      dateCreation: this.form.value.dateCreation,
      dateModification: this.form.value.dateModification,
    };

    this.certificateService.update(certificate).subscribe(()  => {
      this.form.reset();
      this.submitted = false;
      this.showInfoResultOperation();
      this.router.navigate(['/certificates', 'dashboard']);
    }, () => {
      this.submitted = false;
    });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Edit certificate',
      text: `Do you want to update this certificate?`,
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
      title: 'Update certificate',
      text: `The certificate was updated.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
