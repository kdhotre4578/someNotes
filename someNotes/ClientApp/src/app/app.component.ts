import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { User } from './Common/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'someNotes';
  activeUser: User = null;

  constructor(private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    let user = this.authService.GetUser();
    
    if (!user) {
      this.router.navigateByUrl('/login');
    }
    else
    {
      this.authService.VerifyAuthentication().subscribe(x => this.SetUser(user), e => this.SetLogin());
    }
  }

  SetUser(user: User)
  {
    this.activeUser = user;
  }

  SetLogin()
  {
    this.activeUser = null;
    this.router.navigateByUrl('/login');
    alert("User session expired");
  }
}


