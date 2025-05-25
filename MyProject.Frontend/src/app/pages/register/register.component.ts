import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-register',
  imports: [MatRadioModule,MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  authService = inject(AuthService);
  router = inject(Router);

  formBuilder = inject(FormBuilder);

  errorRegMSG = null;


  registerForm: FormGroup = this.formBuilder.group({
    email:['',[Validators.email,Validators.required]],
    password:['', [Validators.required]],
    name:['', [Validators.required]],
    age:['', [Validators.required, Validators.min(0)]],
    isGirl: ['', [Validators.required]] // ✅ שדה חדש שהמשתמש חייב לבחור
  });

  onSubmit() {
    this.errorRegMSG = null;
    
      if(!this.registerForm.valid)
      {
          return;
      }
      console.log(this.registerForm.value);
      this.authService.registerFromApi(this.registerForm.value).pipe(
        catchError(err => {
          this.errorRegMSG = err.error?.message || 'registration error';
          return throwError(()=> err);
        })
      ).subscribe({
        next: (res) => {
          this.router.navigate(['']);
          this.authService.isLoggedIn.set(true);
        },
        error: (err) => {
          console.error('Registration failed', err.error);
        }
      });
  }





}
