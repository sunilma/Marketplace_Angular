import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidateService {
    user: any;
    server = "http://localhost:3000/";

  constructor( private http: Http ) { }

  //user info validation for registration
  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined || user.re_password==undefined || user.status==undefined){
      return false;
    }else{
      return true;
    }

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateContact(contact){
    var re = /^\d{10}$/;
    return re.test(contact);
  }

  comparePassword(pass1, pass2){
    if(pass1 == pass2){
      return true;
    } else {
      return false;
    }
  }

  //job info validation for posting job
  validateJob(job){
    if(job.title == undefined || job.description == undefined || job.deadline == undefined){
      return false;
    } else {
      return true;
    }
  }
}