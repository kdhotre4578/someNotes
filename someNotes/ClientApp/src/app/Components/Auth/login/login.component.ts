import { Component, OnInit } from '@angular/core';
import { User } from '../../../Common/user';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  userName: string = "";
  password: string = "";

  ngOnInit(): void
  {
  }

  Login()
  {
    if (this.userName == "" || this.password == "")
    {
      alert("Please enter in both the fields");
      return;
    }

    this.authService.VerifyUser1(this.userName, this.password).subscribe(user => this.SetUser(user), e => this.DisplayIssue(e));
  }

  SetUser(user: User)
  {
    if (user) {
      this.authService.SetUser(user);
      window.location.reload();
    }
    else {
      alert("Invalid Credentials, please try again..");
    }
  }

  DisplayIssue(e)
  {
    alert("Issue appeared while logging..");
  }
}
