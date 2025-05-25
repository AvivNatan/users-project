import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserInfo } from '../../model/UserInfo.type';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users/users.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-user-details',
  imports: [MatCardModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  
  user!: UserInfo;
  router = inject(ActivatedRoute);
  userService = inject(UsersService);

  ngOnInit()
  {
      const email = this.router.snapshot.paramMap.get('email');
      this.userService.getUserByEmailFromApi(email).pipe(
        catchError((error)=> {
          return throwError(()=> error);
        })
      ).subscribe(
        {
          next: (result) => {
            this.user = result;
          },
          error: (error) => console.log(error)
        }
      )
  }

}
