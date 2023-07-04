import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['idtask', 'title', 'desc', 'status', 'important'];

  tasks = [];
  userTasks: any = [];


  constructor(private taskU: UserService, private snackBar: MatSnackBar, private rou: Router,) { }


  ngOnInit(): void {
    // this.getAllTasks();
    this.tasksForUser();
  }


  // getAllTasks() {
  //   this.taskU.listOfTasks()
  //     .pipe(
  //       catchError((error) => {
  //         console.error(error);
  //         // manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
  //         return [];
  //       })
  //     )
  //     .subscribe((us: any) => {
  //       this.tasks = us;
  //       console.log(us);
  //     });
  // }

  logOut() {
    localStorage.removeItem('token'); // Elimina el valor de la clave 'token' del LocalStorage
    localStorage.removeItem('user'); // Elimina el valor de la clave 'user' del LocalStorage
    this.rou.navigate(['/login']);
    this.openSnackBar('Logout successfully!!!', 'Close');
  }
  tasksForUser() {
    this.taskU.tasksByUser().subscribe(
      data => {
        this.userTasks = data;
        console.log(data);
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }

}
