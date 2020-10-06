import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CertificateService } from 'src/app/certificates/certificate.service';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  isShowMenu = false;

  constructor(public auth: AuthService, private router: Router, private certificateService: CertificateService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    window.addEventListener('click', this.hideMenu.bind(this));
  }

  hideMenu(){    
    if(this.isShowMenu){
      this.isShowMenu = false;
    }
  }

  showMenu(): void{
    setTimeout(() => this.isShowMenu = true, 100)
  }

  // tslint:disable-next-line:typedef
  searchCertificates(searchingValue: string){
      const pageNumber = 1;
      const pageSize = 50;

      this.certificateService.getAll(pageNumber, pageSize, searchingValue);
  }

  // tslint:disable-next-line:typedef
  logout(){
    this.auth.logout();
    this.router.navigate(['/users/login']);
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

  public openDialog(event: Event): void {
    event.preventDefault();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Log out',
      text: `Do you want to logout?`,
      btnTrue: `Logout`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }
}
