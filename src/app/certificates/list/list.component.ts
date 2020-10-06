import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/utils.service';
import { Certificate } from '../../shared/interfaces';
import { CertificateService } from '../certificate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'certificate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  certificates: Certificate[];
  private certificatesSub: Subscription;
  private currentPage = 1;
  private pageSize = 50;
  private searchingCertificates = '';
  private searchSub$ = new Subject<Event>();

  constructor(private certificateService: CertificateService, private utils: UtilsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.certificatesSub = this.certificateService.getAll().subscribe(
      data => this.certificates = data._embedded.certificateDtoList
    );

    this.searchSub$.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe((event: Event) => {
      const searchField = (event.target as HTMLInputElement);
      this.searchingCertificates = searchField.value;
      
      this.currentPage = 1;
      this.certificates = [];
      this.loadCertificates();
    });
  }

  ngOnDestroy(): void {    
    if (this.searchSub$) {
      this.searchSub$.unsubscribe();
    }
    
    if (this.certificatesSub){
      this.certificatesSub.unsubscribe();
    }
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
    this.certificatesSub = this.certificateService.getAll(++this.currentPage, this.pageSize, this.searchingCertificates).subscribe(data => {
        this.certificates = this.certificates.concat(data._embedded.certificateDtoList)
      });
  }

    @HostListener('document:input', ['$event'])
    search(event: Event){
      this.searchSub$.next(event);
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

    public showFavoriteWindow(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        title: 'Favorite goods',
        text: `The feature will be added in future releases.`,
        btnReturnAll: `Cool! I'm looking forward to :)`,
      };
      const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
      dialogRef.afterClosed().subscribe();
    }
}
