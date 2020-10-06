import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { UserService } from './user.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';


@NgModule({
  declarations:   [RegistrationComponent,
                  LoginComponent,
                  CartComponent,
                  UserOrdersComponent,
                  UsersLayoutComponent,
                  DashboardComponent,
                  EditComponent,
                  MyOrdersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [UserService]
})
export class UsersModule { }
