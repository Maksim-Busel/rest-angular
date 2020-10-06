import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Certificate } from 'src/app/shared/interfaces';
import { CertificateService } from '../certificate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'certificate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  certificates: Certificate[];
  certificatesSub: Subscription;
  removeSub: Subscription;
  private currentPage = 1;
  private pageSize = 50;

  constructor(private certificateService: CertificateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.certificatesSub = this.certificateService.getAll().subscribe(
      data => this.certificates = data._embedded.certificateDtoList
    );
  }

  ngAfterViewInit(): void {
    document.addEventListener('scroll', this.loadCertificatesByScroll.bind(this));
  }

  public loadCertificatesByScroll(): void{
    if(window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight){
      this.loadCertificates();
  }
  }

  loadCertificates(): void{
    this.certificateService.getAll(++this.currentPage, this.pageSize).subscribe(data => {
      this.certificates = this.certificates.concat(data._embedded.certificateDtoList)
    });
  }

  ngOnDestroy(): void{
    if (this.certificatesSub){
      this.certificatesSub.unsubscribe();
    }
    if (this.removeSub){
      this.removeSub.unsubscribe();
    }
  }

  remove (id): void {
    this.certificateService.remove(id).subscribe( () => {
      this.certificates = this.certificates.filter(certificate => certificate.id !== id);
      this.showInfoResultOperation();
    });
  }

  public openDialog(id): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete certificate',
      text: `Do you want to delete this certificate?`,
      btnTrue: `Delete`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(id);
      }
    });
  }

  private showInfoResultOperation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete certificate',
      text: `The certificate was deleted.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
