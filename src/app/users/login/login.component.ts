import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import {User} from '../../shared/interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  logout = true;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  submit(){
    if (this.form.invalid){
      return;
    }

    this.submitted = true;
    this.logout = false;

    const user: User = {
      username: this.form.value.login,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe( () => {      
      this.form.reset();
      this.router.navigate(['/shared/home']);
      this.submitted = false;
      this.logout = true;
    }, () => {
      this.submitted = false;
      this.logout = true;
    });
  }
}
