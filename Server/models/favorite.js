'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema of favorite details
let favorite = new Schema({
        address:{
            type:String,
            required:"Specify Address"
        },
        state:{
         type:String,
         required:"Specify State"
     },
     city:{
         type:String,
         required:"Specify State"
     },
     zip:{
         type:String,
         required:"Specify Zip"
     },
         houseType: {
             type: String,
             required: "Specify house type"
         },
         noOfBedroom: {
             type: Number,
             required: "Specify No of bedrooms"
         },
         noOfBathrooms: {
             type: Number,
             required: "Specify No fo bathrooms"
         },
         sqft: {
             type: Number,
             required: "Specify house area"
         },
         description: {
             type: String,
         },
         postedBy: {
             type: String,
         },
         purpose: {
             type: String,
         },
         imgsrc:
         {
             type:String,
         },
         price:{
             type: String,
         },
         username:{
             type:String,
         },
         favorite:{
             type: Boolean,
             default:false
     
         }
    
});
module.exports = mongoose.model('favorite', favorite);
