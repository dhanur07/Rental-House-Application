import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { HouseComponent } from './house/house.component';
import { HouseAddComponent } from './house-add/house-add.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { HouseEditComponent } from './house-edit/house-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BottomComponent } from './bottom/bottom.component';

import { HomepageComponent } from './homepage/homepage.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from "ng2-file-upload";
import { HttpModule } from '@angular/http';


import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';

import { UserLoginComponent } from './user-login/user-login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CommonModule } from '@angular/common';



const appRoutes: Routes = [ //routes to pages
  {
    path: 'homepage',
    component: HomepageComponent,
    data: { title: 'Homepage' }
  },
  {
    path: 'houses',
    component: HouseComponent,
    data: { title: 'House List' }
  },
  {
    path: 'house-details/:id',
    component: HouseDetailComponent,
    data: { title: 'House Details' }
  },
  {
    path: 'house-add',
    component: HouseAddComponent,
    data: { title: 'House Add' }
  },
  {

    path: 'aboutus',
    component: AboutusComponent,
    data: { title: 'AboutUS' }
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    data: { title: 'ContactUS' }
  },
  
  
{
    path: 'user-login',
    component: UserLoginComponent,
    data: {title: 'user'}
  },
  {
    path: 'new-user',
    component: NewUserComponent,
    data: { title: 'New user' }
  },
  {

    path: 'aboutus',
    component: AboutusComponent,
    data: { title: 'AboutUS' }
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    data: { title: 'ContactUS' }
  },
  {
    path: 'user-home',
    component: UserHomeComponent,
    data: {title: 'user-home'}
  },


  {
    path: 'house-edit/:id',
    component: HouseEditComponent,
    data: { title: 'House Edit' }
  },
  { path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [ //declaring all thr components
    AppComponent,
    HouseComponent,
    HouseAddComponent,
    HouseDetailComponent,
    HouseEditComponent,
    NavbarComponent,
    BottomComponent,
    HomepageComponent,
    NewUserComponent,
    UserHomeComponent,
    ContactusComponent,
    AboutusComponent,
    UserLoginComponent,

  ],
  imports: [  // importing all the neccessorymodules
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,   
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGpbUohOMVEmS8YRFVRQy4FlTS3oy1ndo',// api for google maps
      libraries: ['places','geometry'],
      
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
