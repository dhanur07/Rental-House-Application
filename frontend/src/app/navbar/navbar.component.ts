import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // private currentUserSubject: BehaviorSubject<User>;
  public currentUser: any;
  private token: string;

  constructor(route: ActivatedRoute, private router: Router, public rest : AppService) { 
    this.currentUser = sessionStorage.getItem("currentuser");
  }
 

  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem("currentuser");
   //alert(this.currentUser);
  }


  // check if the user is already logged in
  onlogin(): void {
    if (sessionStorage.length == 1) {
      this.router.navigate(['/user-home/']);
    }
    else {
      this.router.navigate(['/user-login/']);
  }
  }

}
