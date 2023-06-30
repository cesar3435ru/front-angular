import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  users = [];

  constructor(private userS: UserService, private snackBar: MatSnackBar, private rou: Router,) { }

  
  ngOnInit(): void {
    this.getAllUsers(); 
  }

  getAllUsers() {
    this.userS.listOfUsers()
      .pipe(
        catchError((error) => {
          console.error(error);
          // manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
          return [];
        })
      )
      .subscribe((us: any) => {
        this.users = us;
        console.log(us);
      });
  }

  logOut() {
    localStorage.removeItem('token'); // Elimina el valor de la clave 'token' del LocalStorage
    localStorage.removeItem('user'); // Elimina el valor de la clave 'user' del LocalStorage
    this.rou.navigate(['/login']);
    this.openSnackBar('Logout successfully!!!', 'Close');



  }
  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }
  

}
