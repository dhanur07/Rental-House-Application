import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit {

  house:any;

  constructor(public rest:AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getHouse(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.house = data;
    });
  }

}
