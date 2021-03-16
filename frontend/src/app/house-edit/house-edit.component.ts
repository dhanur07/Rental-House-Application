import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.scss']
})
export class HouseEditComponent implements OnInit {

  @Input() houseData:any = { price:'',city:'',state:'',zip:'',description: '', houseType: '',address:'',noOfBedroom:'' ,noOfBathrooms:'',sqft:'', purpose:'' };

  constructor(public rest:AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.rest.getHouse(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.houseData = data;
    });
  }

  updateHouse() {
    if(this.houseData.sqft == '' || this.houseData.city == '' || this.houseData.zip == '' || this.houseData.address == '' || this.houseData.state =='' || this.houseData.description== '') 
      alert("Enter Required fields");
    this.rest.updateHouse(this.route.snapshot.params['id'], this.houseData).subscribe((result) => {
      this.router.navigate(['/house-details/'+result._id]);
    }, (err) => {
      console.log(err);
    });
  }

}