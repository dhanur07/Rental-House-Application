import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';

@Component({
selector: 'app-new-user',
templateUrl: './new-user.component.html',
styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

credentials: TokenPayload = {//initializing with empty string
  userEmailID: '',
  name: '',
  phone: '',
  username: '',
  password: ''
};
newForm: FormGroup;

  constructor(public rest: AppService,private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

ngOnInit(): void {
  this.newForm = this.formBuilder.group({ // making the fieds required
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required]
  });
  sessionStorage.setItem('currentuser','');
}
//once the user registers API call is made to add the user and send an email notification and navigate to user home page
  onRegister() {
    this.credentials.username = this.credentials.userEmailID;
    this.rest.addUser(this.credentials).subscribe((result) => {    
      
      sessionStorage.setItem('currentuser', this.credentials.username);
      this.router.navigateByUrl('/user-home');
  }, (err) => {
    console.error(err);
  })
}
}
