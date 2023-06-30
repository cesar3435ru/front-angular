import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, BehaviorSubject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  public isAuthenticated = new BehaviorSubject<boolean>(false); // Propiedad de autenticación

  url:string = 'http://localhost:3000';

  token: any = '';
  user: any = {};

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

   // Función para obtener el valor de isAuthenticated como un Observable
   getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  addUser(user: any) {
    return this.http.post(this.url + '/api/users/createUser', user);
  }

  loginIn(user: any) {
    return this.http.post(this.url + '/api/users/login', user);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));

  }
  
  listOfUsers() {
    return this.http.get(this.url + '/api/users/allUsers');
  }

  listOfTasks() {
    return this.http.get(this.url + '/api/task/allTasks');
  }

  isAuth(): boolean {
    this.token = localStorage.getItem('token') || null;
    this.user = JSON.parse(localStorage.getItem('user') || 'null') || null;

    if (this.token === null || this.user === null) {
      return false
    } else {
      return true
    }
    
  }
  
}
