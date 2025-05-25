import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'user/:email',
        loadComponent: ()=> {
            return import('./pages/user-details/user-details.component').then(m=>m.UserDetailsComponent);
        }
    },
    {
        path: 'register',
        loadComponent: () => {
            return import('./pages/register/register.component').then(m=>m.RegisterComponent);
        }
    },
    {
        path: 'login',
        loadComponent: () => {
            return import('./pages/login/login.component').then( m => m.LoginComponent);
        }
    },
    {
        path: 'users',
        loadComponent: () => {
            return import('./pages/users/users.component').then( m => m.UsersComponent);
        }
    },
    {
        path:'',
        pathMatch: 'full',
        loadComponent: () => { 
            return import('./pages/home/home.component').then( m => m.HomeComponent);   
        }
    },
    {
        path: 'logout',
        redirectTo:''
    }

];
