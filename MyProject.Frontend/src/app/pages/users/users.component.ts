import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { UserInfo } from '../../model/UserInfo.type';
import { UsersService } from '../../services/users/users.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [MatSlideToggleModule,MatSortModule,MatPaginatorModule, MatButtonModule,MatTableModule, MatFormFieldModule,MatInputModule, MatCardModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sorter!:MatSort;

  isLoading = signal(true);


  
  displayedColumns: string[] = ['name', 'email', 'age', 'isGirl','changeGender'];

  UsersService = inject(UsersService);
  dataSource = new MatTableDataSource<UserInfo>();

  errorMSG = null;
  name = signal('');

  router = inject(Router);

  ngOnInit()
  {
    this.getUsersFromApi(this.name());
  }

  updateGenderFromApi(user: UserInfo) : void
  {
    this.UsersService.updateGenderFromApi(user.email).pipe(
        catchError((error)=>{
          this.errorMSG = error.error?.message || 'server failed update';
          return throwError(()=> error);
        })
    ).subscribe(
      {
        next: (result) => {
          console.log(result.message)
          user.isGirl = !user.isGirl;
        },
        error: (error) => console.log(error)
      }
    )

  }

  getUsersFromApi(name? :string) : void
  {
    this.isLoading.set(true);
    this.UsersService.getUsersFromApi(name).pipe(
        catchError((err) => {
          this.errorMSG = err.error?.message || 'server failed extract users';
          return throwError(()=> err);
        })
    ).subscribe(
      {
          next:(users)=>{
            this.dataSource.data = users;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sorter;
            this.dataSource.filterPredicate = (data: UserInfo,filter: string) :boolean =>{
              return data.name.toLowerCase().includes(filter);
            };
            this.errorMSG=null;
            this.isLoading.set(false);
          },
          error: (err)=>{
            console.log(err);
          }
      })
  }

  applyFilter(event: Event): void
  {
     const filterTerm = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterTerm;
  }
  updateNameSignal(event: Event) : void
  {
    this.name.set((event.target as HTMLInputElement).value);
  }
  onClickUpdateWithQuery()
  {
     this.getUsersFromApi(this.name());
  }
  onClickUser(email:string)
  {
    this.router.navigate(['/user',email]);
  }
  

}
