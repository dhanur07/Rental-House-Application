import { Component, OnInit } from '@angular/core';
import { first, flatMap } from 'rxjs/operators';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NewUserComponent } from '../new-user/new-user.component';
import { FormBuilder, FormGroup,FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../_services/authentication.service';
import { AppService } from '../app.service';
import { User } from '../user/user';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  // loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;
  error = '';
  users: User[] = [];
  userID: any;
  name: any;
  credentials: TokenPayload = {
    userEmailID: '',
    password: '',
    username: ' ',
    phone: ''
  };
  loginForm: FormGroup;

  constructor(public rest: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl' || '/user-home'];
  }

  
// on login function
  onSubmit() {
    let userName = this.credentials.username;
    let password = this.credentials.password;
    this.rest.getUsers().subscribe((data: User[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === userName) {
          this.userID = data[i].username;
          this.name = data[i].firstName;
        }
      }
    });
    this.rest.login(userName, password)
      .subscribe(data => {
        console.log(data);
        // only if the user details match the user will be naviagted to the user home page and will be set as current user
        if (data.status == 200) {
          sessionStorage.setItem('currentuser', this.userID);
        // navigating to the home page of the user
          this.router.navigate(['/user-home/']);
        }

        if (data.status == 500) {
          alert(data.message);
        }
    },
      error => {
        alert(error)
        console.log(error)
        }
    )
  }

  // Navigating to new registration page
  newUser($event: any) {
    this.router.navigateByUrl('/new-user');
  }
}