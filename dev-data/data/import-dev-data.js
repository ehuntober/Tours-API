const fs = require('fs')
const mongoose = required('mongoose')
const dotenv = require('dotenv')
const Tour = require('./../../models/tourModel')

dotenv.config({ path: './../../config.env' });



// READ JSON FILE
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')

//  IMPORT DATA INTO DB
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log(`Data Successfully loaded`)
    } catch(err){
        console.log(err);
    }
}

// DELETE DATA FROM DB
const deleteData = async () =>{
    try{
        await Tour.deleteMany(tours);
        console.log(`Data Successfully deleted`)
    } catch(err){
        console.log(err);
    }
}

console.log(process.argv)
