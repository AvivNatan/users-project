import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  fb = inject(FormBuilder);

  AuthService = inject(AuthService);

  router= inject(Router);
  
  loginForm: FormGroup = this.fb.group(
    {
      email: ['',[ Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    }
  );
  errorLoginMSG = null;

  onSubmit()
  {
      this.errorLoginMSG = null;

      if(!this.loginForm.valid)
      {
        return;
      }

      this.AuthService.loginFromApi(this.loginForm.value).pipe(
        catchError( err => {
          this.errorLoginMSG = err.error?.message || 'login failed';
          return throwError(()=> err);
        })
      ).subscribe(
        {
          next: (res) => {
            this.router.navigate(['']);
            this.AuthService.isLoggedIn.set(true);
            console.log(res);
          },
          error: (err) => {
            console.log('login failed', err.error);
          }
        });
  }
  
}
