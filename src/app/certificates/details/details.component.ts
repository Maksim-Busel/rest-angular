import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/utils.service';
import { Certificate } from '../../shared/interfaces';
import { CertificateService } from '../certificate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'certificate-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  certificate: Certificate;

  constructor(private certificateService: CertificateService, 
              private route: ActivatedRoute, 
              private utils: UtilsService, 
              public dialog: MatDialog) {}

  ngOnInit(): void {
    const certificateId = this.route.params['_value']['id'];
    this.certificateService.getById(certificateId).subscribe(certificate => this.certificate = certificate);
  }

  addToCart(certificate: Certificate){
    const certificateWithoutLinks: Certificate = {
      id: certificate.id,
      name: certificate.name,
      description: certificate.description,
      price: certificate.price,
      dateCreation: certificate.dateCreation,
      duration: certificate.duration,
      dateModification: certificate.dateModification,
    }

    this.utils.addToCart(certificateWithoutLinks);
    this.showInfoResultOperation();
  }

  public openDialog(certificate: Certificate): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Add certificate to cart',
      text: `Do you want to add this certificate to cart?`,
      btnTrue: `Add to cart`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addToCart(certificate);
      }
    });
  }

  private showInfoResultOperation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Add certificate to cart',
      text: `The certificate was added to cart.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
