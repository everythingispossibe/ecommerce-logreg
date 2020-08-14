import { Input, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // @Input('user') user: any;
  public profileForm: FormGroup = this.formBuilder.group({
    name: '',
    email: '',
    username: '',
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (profile: any) => {
        this.profileForm = this.formBuilder.group({
          name: profile.user.name,
          email: profile.user.email,
          username: profile.user.username,
        });
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  updateProfile() {}
}
