import { Component, OnInit, Input, NgModule } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadModule,FileUploader } from "ng2-file-upload";

const URL = 'http://localhost:3000/post/upload';  //url for image upload
class ImageSnippet {
  pending: boolean = false;
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-house-add',
  templateUrl: './house-add.component.html',
  styleUrls: ['./house-add.component.scss']
})

export class HouseAddComponent implements OnInit {
  imagepath: String;
  selectedFile: ImageSnippet;// declaring empty strings
  @Input() houseData = { username:'',price:'',city:'',state:'',zip:'', description: '', houseType: '',address:'',noOfBedroom:'' ,noOfBathrooms:'',sqft:'', purpose:'',imgsrc:'' };

  constructor(public rest:AppService, private route: ActivatedRoute, private router: Router) { 

    this.houseData.username=this.rest.currentUser;
  }
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});// for uploading file
  
  ngOnInit() {

    this.houseData.username=sessionStorage.getItem("currentuser");
    console.log(URL);
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {// for uploading images
      console.log('ImageUpload:uploaded:', item.file.name, status, response);
      this.imagepath = item.file.name;
      this.houseData.imgsrc=item.file.name;
      alert('Image uploaded successfully');
    };
  }  
 

  addHouse() {//post the details of houses using id
    if(this.houseData.city == '' || this.houseData.zip == '' || this.houseData.address == '' || this.houseData.state =='' || this.houseData.description== '') 
        alert("Enter Required fields");
    this.rest.addHouse(this.houseData).subscribe((result) => {
      this.router.navigate(['/house-details/'+result._id]);
    }, (err) => {
      console.log(err);
    });
  }

}