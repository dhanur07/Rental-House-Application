import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  title: string = 'AGM project';  //declaring all the neccessory variables
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  house:any;
  private geoCoder;
  i:any;
  houses:any = [];
  favorites:any = [];
  currentUser:any;
  allhouses:any=[];
  public search: any = '';
  public newfavorite:any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
 
 
  constructor(public rest:AppService, private route: ActivatedRoute, private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
  getPostedHouses(search) {
    // if(this.currentUser)
    //     this.getFavorites();
    // else
     this.getHouses();
     //this.getFavorites();
  }
 
  ngOnInit() {
    //load Places Autocomplete
    
    this.currentUser=sessionStorage.getItem('currentuser');
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
 
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
 
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {//gets location with lattitude and longitude
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }
  getHouses() {
    this.houses = [];
    this.rest.getHouses().subscribe((data: {}) => {
      console.log(data);
      this.houses = data;
    });
    
  }
  getFavorites() {
    this.favorites = [];
    this.rest.getFavorites().subscribe((data: {}) => {
      console.log(data);
      this.favorites = data;
    });
  }
  add() {
    this.router.navigate(['/house-add']);
  }

  delete(id) {
    this.rest.deleteHouse(id)
      .subscribe(res => {
          this.getHouses();
        }, (err) => {
          console.log(err);
        }
      );
  }
  favorite(updatedhouse) {
    this.newfavorite=updatedhouse;
    //alert(updatedhouse);
     this.newfavorite.favorite='true';
      // this.rest.updateHouse(this.route.snapshot.params['id'], updatedhouse).subscribe((result) => {
      //   //this.router.navigate(['/house-details/'+result._id]);
      // }, (err) => {
      //   console.log(err);
      // });
      this.newfavorite.username=this.currentUser;
      this.rest.addFavorite(this.newfavorite).subscribe((result) => {
        //this.router.navigate(['/house-details/'+result._id]);
      }, (err) => {
        console.log(err);
      });
    alert("Added to favorite");
  }
  undofavorite(updatedhouse) {
    //alert(updatedhouse);
     //updatedhouse.favorite=false;
      // this.rest.updateHouse(updatedhouse._id, updatedhouse).subscribe((result) => {
      //   //this.router.navigate(['/house-details/'+result._id]);
      // }, (err) => {
      //   console.log(err);
      // });
      this.rest.deleteFavorite(updatedhouse.username).subscribe((result) => {
        this.getFavorites();
        //this.router.navigate(['/house-details/'+result._id]);
      }, (err) => {
        console.log(err);
      });
      
    alert("Remove from favorite");
  }
}
