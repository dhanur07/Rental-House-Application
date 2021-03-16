import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  public currentUser: any;
  public newfavorite:any;
  houses:any = [];
  constructor(public route: ActivatedRoute, private router: Router, public rest: AppService,) {
    this.currentUser = sessionStorage.getItem("currentuser");
   }

  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem("currentuser");
  }

//  navigates to the page to allow user to add a house
  naviagte(): void {
    this.router.navigateByUrl('/house-add');  
    console.log("reached .ts file")
  }

  // to get the list of houses posted by the user
  getPostedHouses() {
    this.currentUser = sessionStorage.getItem("currentuser");
    this.getHouses();
  }  
 
  // retriving all the houses
  getHouses() {
    this.houses = [];
    this.rest.getHouses().subscribe((data: {}) => {
      console.log(data);
      this.houses = data;
    });
  }

  // deleting house by id
  delete(id) {
    this.rest.deleteHouse(id)
      .subscribe(res => {
          this.getHouses();
        }, (err) => {
          console.log(err);
        }
      );
      this.rest.deleteFavorite(this.currentUser).subscribe((result) => {
        this.getFavorites();
      }, (err) => {
        console.log(err);
      });
  }

  // to update a house as a favourite in the user list
  favorite(updatedhouse) {
    //alert(updatedhouse);
    this.newfavorite=updatedhouse;
    this.newfavorite.favorite=true;
      this.newfavorite.username=this.currentUser;
      this.rest.addFavorite(this.newfavorite).subscribe((result) => {
      }, (err) => {
        console.log(err);
      });
  }

  undofavorite(updatedhouse) {
       this.rest.deleteFavorite(updatedhouse.username).subscribe((result) => {
        //this.router.navigate(['/house-details/'+result._id]);
      }, (err) => {
        console.log(err);
      });
    //alert("added to favorite");
  }

// getting favorite houses
  getFavorites() {

    this.currentUser = sessionStorage.getItem("currentuser");
    this.houses = [];
    this.rest.getFavorites().subscribe((data: {}) => {
      console.log(data);
      this.houses = data;
    });
    
  }

  // logout of the session
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/user-login/']);
  }

}
