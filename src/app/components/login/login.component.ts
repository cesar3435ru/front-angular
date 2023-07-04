import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private user: UserService, private snackBar: MatSnackBar, private rou: Router,
  ) { }

  ngOnInit(): void {
  }

  // login(){
  //   console.log('Probando funcion');
  //   console.log(this.loginForm.value);
  //   this.loginForm.reset();
  // }


  // login() {
  //   console.log(this.loginForm.value);
  //   this.user.loginIn(this.loginForm.value).subscribe(
  //     (data: any) => {
  //       this.user.saveToken(data.myToken);
  //       this.user.saveUser(data.nombre);
  //       // this.user.saveUser(data);
  //       console.log('Welcome');
  //       // console.log('esta es mi', data);
  //       this.openSnackBar('Login successfully!!!', 'Close');
  //       this.user.isAuthenticated.next(true); // Establecer isAuthenticated a true
  //       console.log(this.user.isAuthenticated);

  //       this.loginForm.reset();
  //       this.rou.navigate(['/tasks']);
  //     },
  //     error => {
  //       this.loginForm.reset();
  //       this.openSnackBar('Error!!!', 'Close');
  //       console.log(error);

  //     }
  //   )
  // }



  login() {

    this.user.loginIn(this.loginForm.value).subscribe(
      (datos: any) => {
        if (datos) {

          this.openSnackBar('Login successfully!!!', 'Close');
          this.user.saveToken(datos.myToken);
          this.user.saveUser(datos);
          this.loginForm.reset();
          this.rou.navigate(['/tasks']);

        }
      }, error => {
        this.openSnackBar('Error!!!', 'Close');
        this.loginForm.reset();

      }
    )

  }





  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }
}
