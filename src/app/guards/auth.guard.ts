import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router, private snackBar: MatSnackBar){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isAuth()) {
        console.log('Estamos dentro del sistema'); 
      }else{
        console.log('No estoy logueado');
        this.openSnackBar('Access denied!!!', 'Close');
        this.router.navigateByUrl('/login');
      }
        return true;
    }


    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000, // Duración en milisegundos
      });
    }

  }
  

