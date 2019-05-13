import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  contact: String;
  password: String;
  re_password: String;
  status: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      contact: this.contact,
      username: this.username,
      password: this.password,
      re_password: this.re_password,
      status: this.status
    }


    //validation
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validation email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //10 digit phone number validation
    if(!this.validateService.validateContact(user.contact)){
      this.flashMessage.show('Please enter 10 digit contact number', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //compare password
    if(!this.validateService.comparePassword(user.password, user.re_password)){
      this.flashMessage.show('Passwords do not match', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    })
  }

}
