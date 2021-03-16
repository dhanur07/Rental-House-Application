import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

const URL = '../assets/';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomepageComponent implements OnInit {
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
constructor( private route: ActivatedRoute, private router: Router,config: NgbCarouselConfig) {
  config.interval = 10000;//config for sliders
  config.wrap = false;
  config.keyboard = false;
  config.pauseOnHover = false;
}
   
   
  
   

  ngOnInit(): void {}
  
}
