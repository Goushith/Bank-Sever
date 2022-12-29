//server - mongodb intre gratin

//1 import mongoose


const mongoose=require('mongoose')

//tate connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',

{
    useNewUrlParser:true // to avoid unwanted warnings
});

//define bankbd model 

const User=mongoose.model('user',
{
    //schema creation 
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export colleection 

 module.exports={
    User
 }
