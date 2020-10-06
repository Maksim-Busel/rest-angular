import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { EditComponent } from './edit/edit.component';
import { AuthUserGuard } from '../shared/auth-user.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuard } from '../shared/auth.guard';


const usersRoutes: Routes = [
    {path: '', component: UsersLayoutComponent, children: [
        {path: 'login', component: LoginComponent},
        {path: 'registration', component: RegistrationComponent},
        {path: 'cart', component: CartComponent, canActivate: [AuthUserGuard]},
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
        {path: 'user/:id/orders', component: UserOrdersComponent, canActivate: [AuthGuard]},
        {path: 'user/:id/edit', component: EditComponent, canActivate: [AuthGuard]},
        {path: 'user/my-orders', component: MyOrdersComponent, canActivate: [AuthUserGuard]},
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(usersRoutes)],
    exports: [RouterModule],
  })
  export class UsersRoutingModule {}
