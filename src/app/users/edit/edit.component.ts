import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../shared/dialog-window/dialog-window.component';
import { InfoWindowComponent } from '../../shared/info-window/info-window.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  user: User;
  submitted = false;

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    const userId = this.activeRoute.params['_value']['id'];
    this.userService.getById(userId).subscribe(data => {
      this.user = data;
      this.form = new FormGroup({
      id: new FormControl(this.user.id, [Validators.required]),
      username: new FormControl(this.user.username, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(4)]),
    });
    });
  }

  // tslint:disable-next-line:typedef
  submit() {
    if (this.form.invalid){
      return;
    }

    this.submitted = true;

    const user: User = {
      id: this.user.id,
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.userService.update(user).subscribe(() => {
      this.form.reset();
      this.submitted = false;
      this.showInfoResultOperation();
      this.router.navigate(['/users', 'dashboard']);
    }, () => {
      this.submitted = false;
    });
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Edit user',
      text: `Do you want to update this user?`,
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
      title: 'Update user',
      text: `The user was updated.`,
      btnReturnAll: `Ok`,
    };
    const dialogRef = this.dialog.open(InfoWindowComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }
}
