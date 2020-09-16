import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserRegisterModel } from '../../../Common/user-register-model';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegisterFlag: boolean;
  displayMessage: string;
  displayClass: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Username: ['', Validators.required],
    Password: ['', Validators.required],
    ConfirmPassword: ['', Validators.required]
  });

  IsFieldEmpty(control: AbstractControl)
  {
    let val: string = control.value;
    return !(val.trim().length === 0) ? null : { 'whitespace' : true};
  }

  IsPasswordEqual(c: AbstractControl)
  {
    // alert(c.get('Password').value == c.get('ConfirmPassword').value);
    //return //(c.get('Password').value == c.get('ConfirmPassword').value) ? null : { passwordDifferent : true };
  }

  Submit()
  {
    let user: UserRegisterModel = new UserRegisterModel();

    user.FirstName = this.registerForm.controls['FirstName'].value;
    user.LastName = this.registerForm.controls['LastName'].value;
    user.Username = this.registerForm.controls['Username'].value;
    user.Password = this.registerForm.controls['Password'].value;

    this.authService.RegisterUser(user).subscribe(r => this.SetOutput(r), e => this.DisplayError(e));
  }

  SetOutput(output)
  {
    this.userRegisterFlag = true;
    this.DisplayMessage(true);
    this.registerForm.reset();
  }

  DisplayError(err)
  {
    this.userRegisterFlag = false;
    this.displayMessage = JSON.stringify(err);
    this.DisplayMessage(false);
  }

  DisplayMessage(isRegistered: boolean)
  {
    this.displayClass = isRegistered ? "registerSuccess" : "registerFail";
    this.displayMessage = isRegistered ? "Thank you "
      + this.registerForm.controls['FirstName'].value + " for registering, please login..." :
      "Failed to register " + this.registerForm.controls['FirstName'].value + ", please contact administrator";
  }
}
