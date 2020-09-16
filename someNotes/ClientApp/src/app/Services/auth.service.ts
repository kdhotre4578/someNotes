import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Common/user';
import { UserRegisterModel } from '../Common/user-register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  VALID_USER = "someNotes_User"
  user: User;
  securityUrl: string = "https://localhost:44314/api/security";
  securityGetUrl: string = this.securityUrl + "?username=";
  reqHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  GetUrl(username: string, password: string): string
  {
    return this.securityGetUrl + username + "&password=" + password;
  }

  VerifyUser(username: string, password: string)
  {
    this.GenerateToken(username, password).subscribe(x => this.SetUser(x));
  }

  VerifyUser1(username: string, password: string) {
    return this.GenerateToken(username, password);
  }

  SetUser(user: User)
  {
    this.user = user;
    localStorage.setItem(this.VALID_USER, JSON.stringify(user));
  }

  IsAuthenticated(): boolean
  {
    let sUser: string = localStorage.getItem(this.VALID_USER);
    if (sUser == null || sUser.trim() == "")
    {
      return false;
    }

    return true;
  }

  VerifyAuthentication()
  {
    return this.httpClient.get(this.securityUrl + "/1");
  }

  GetToken(): string {
    let sUser: string = localStorage.getItem(this.VALID_USER);

    if (!sUser) {
      return null;
    }

    let user: User = JSON.parse(sUser);
    return user.Token;
  }

  GetUser(): User
  {
    let sUser: string = localStorage.getItem(this.VALID_USER);

    if (sUser == null || sUser.trim() == "")
    {
      return null;
    }

    let user: User = JSON.parse(sUser);
    if (user)
    {
      user.Token = "";
    }

    return user;
  }

  GenerateToken(username: string, password: string)
  {
    let url: string = this.GetUrl(username, password);
    return this.httpClient.get<User>(url);
  }

  RemoveToken()
  {
    let sUser: string = localStorage.getItem(this.VALID_USER);

    if (sUser)
    {
      localStorage.removeItem(this.VALID_USER);
    }
  }

  RegisterUser(user: UserRegisterModel)
  {
    return this.httpClient.post(this.securityUrl, user, { headers: this.reqHeaders });
  }
}
