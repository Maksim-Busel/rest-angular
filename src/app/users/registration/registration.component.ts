import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  logout = true;

  constructor(public userService: UserService, private router: Router,  private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      repeatedPassword: new FormControl(null, [Validators.required])
    }, {
      validators:  matchingPasswords('password', 'repeatedPassword') 
    });
  }

  submit(){
    if (this.form.invalid){
      return;
    }

    this.submitted = true;
    this.logout = false;

    const user: User = {
      username: this.form.value.username,
      password: this.form.value.password
    };

    this.userService.create(user).subscribe( () => {      
      this.form.reset();
      this.router.navigate(['/users/login']);
      this.submitted = false;
      this.logout = true;
    }, () => {
      this.submitted = false;
      this.logout = true;
    });
  }
}

export function matchingPasswords(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {
    const password = group.controls[passwordKey];
    const confirmPassword = group.controls[confirmPasswordKey];
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  };
}