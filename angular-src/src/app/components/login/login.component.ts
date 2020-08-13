import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
  })
}
  ifInputFieldEmpty(){
    if (this.password && this.username){
      return false
    }
    return true
  }
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(user).subscribe((data) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.openSnackBar("You are logged in!","Success")
        /*this.flashMessage.show('You are logged in!', {
          cssClass: 'alert-success',
          tiemout: 5000,
        });*/
        this.router.navigate(['home']);
      } else {
        this.openSnackBar("Wrong username and/or password","Warning")
        /*this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          tiemout: 10000,
        });*/
        this.router.navigate(['login']);
      }
    });
  }
}
