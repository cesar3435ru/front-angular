import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../validations/custom-validator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private userS: UserService,
    private rou: Router,
    private snackBar: MatSnackBar) { }


  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nombre: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    edad: new FormControl(null, [Validators.required]),
    sexo: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
    { validators: CustomValidators.passwordsMatching }
  )

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm && this.registerForm.valid) {
      const formData = {
        email: this.registerForm.get('email')!.value,
        nombre: this.registerForm.get('nombre')!.value,
        apellidos: this.registerForm.get('apellidos')!.value,
        edad: this.registerForm.get('edad')!.value,
        sexo: this.registerForm.get('sexo')!.value,
        password: this.registerForm.get('password')!.value,
      };      
      this.userS.addUser(formData).subscribe(response => {
        console.log('User guardado con éxito');
      });
      // resetear el formulario después de guardar
      this.registerForm.reset();
      this.rou.navigate(['/login']);
      this.openSnackBar('Successful registration!!!', 'Close');

    }
  }

  
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }
  
}

