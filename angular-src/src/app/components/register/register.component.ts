import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  address: String;
  number: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
  })
}
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      address: this.address,
      number: this.number,
    };

    //required fields
    if (!this.validateService.validateRegister(user)) {
      this.openSnackBar("Please fill all fields","Warning")
      /* this.flashMessage.show('Please fill all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });*/
      return false;
    }

    //validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.openSnackBar("Please use a valid email","Warning")
      /*this.flashMessage.show('Please use a valid email', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });*/
      return false;
    }
    //register user
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.openSnackBar("You are now registered and can log in","Success")
        /*this.flashMessage.show('You are now registered and can log in', {
          cssClass: 'alert-success',
          timeout: 3000,
        });*/
        this.router.navigate(['/login']); //redirakcija nakon uspješne registracije
      } else {
        this.openSnackBar("Something went wrong","Warning")
        /*this.flashMessage.show('Something went wrong!', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });*/
        this.router.navigate(['/register']);
      }
    });
  }
}
