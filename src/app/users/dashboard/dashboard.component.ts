import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: User[];
  usersSub: Subscription;
  removeSub: Subscription;
  private currentPage = 1;
  private pageSize = 50;

  constructor(private userService: UserService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.usersSub = this.userService.getAll().subscribe(
      data => this.users = data._embedded.userDtoList
    );
  }

  ngAfterViewInit(): void {
    document.addEventListener('scroll', this.loadUsersByScroll.bind(this));
  }

  public loadUsersByScroll(): void{
    if(window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight){
      this.loadUsers();
  }
  }

  loadUsers(): void{
    this.userService.getAll(++this.currentPage, this.pageSize).subscribe(data => {
      this.users = this.users.concat(data._embedded.userDtoList)
    });
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy(){
    if (this.usersSub){
      this.usersSub.unsubscribe();
    }
    if (this.removeSub){
      this.removeSub.unsubscribe();
    }
  }

// tslint:disable-next-line:typedef
  remove(id: number, userRoles){     
    if(this.isAdmin(userRoles)){        
      this.showRemoveAdminFailed()
      return;
    }

    this.removeSub = this.userService.remove(id).subscribe( () => {
      this.users = this.users.filter(user => user.id !== id);
      this.showInfoResultOperation();
    });
  }

  isAdmin(userRoles){
    const ADMIN = 'ROLE_ADMIN';
    for(let role of userRoles){
      const roleName = role.name;      
      if(roleName === ADMIN){        
        return true;
      }
    }

    return false;
  }

  public openDialog(id: number, userRoles): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete user',
      text: `Do you want to delete this user?`,
      btnTrue: `Delete`,
      btnFalse: `Cancel`
    };
    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(id, userRoles);
      }
    });
  }

  private showRemoveAdminFailed(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete admin',
      text: `You can't delete a user with the admin role`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }

  private showInfoResultOperation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete user',
      text: `The user was deleted.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
