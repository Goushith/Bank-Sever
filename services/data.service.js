//import JWT token
const jwt=require('jsonwebtoken')

//import db
const db=require('./db')


//database
userDetails={
    1000:{acno:1000,username:"Amal",password:1000,balance:3000,transaction:[]},
    1001:{acno:1001,username:"Pranav",password:1001,balance:1000,transaction:[]},
    1002:{acno:1002,username:"Anujith",password:1002,balance:1000,transaction:[]},
  }



  
  
  const register=(acno,username,password)=>{
  return db.User.findOne({acno})//data
  .then(user=>{
    if(user){
      return {
        status:false,
        statusCode:400,
        message:'user already registered'
      }
    }

    else{
      const newUser= new db.User({

        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[] 
      })
    

    newUser.save();
    return{
      status:'True',
        statusCode:200,
        message:'Register Succesfull'
    }



  }})}




 const  login=(acno,pswd)=>{
  return db.User.findOne({acno,pswd})
  .then(user=>{
    if(user){
      currentUser=user.username
      currentAcno=acno
      const token = jwt.sign({
        currentAcno:acno},
      'superkey2002')
      return{
        status:'True',
        statusCode:200,
        message:'Login Succesfull',
        token:token,
        currentUser:currentUser,
        currentAcno:currentAcno
      }
    }
    else{
      return {
        status:'false',
        statusCode:400,
        message:'invaild user details'
      }
    }
  })
  }
  

























const  deposit=(acno,pswd,amt)=>{

    var amount=parseInt(amt)
   return db.User.findOne({acno,pswd})
   .then(user=>{
    if(user){
    
      user.balance+=amount;
      user.transaction.push({
          Type:'Credit',
          Amount:amount
        });
        user.save();
        return {
          status:'True',
          statusCode:200,
          message:`${amount} is credited and balance is ${user.balance}`
        }
        
      }
      else{
        return {
          status:'false',
          statusCode:400,
          message:'invaild userdetails'
        }
      }
    })
  }
  
      



   const withdraw=(acno,pswd,amt)=>{
      var amount=parseInt(amt)
      
      
      return db.User.findOne({acno,pswd})
      .then(user=>{
        if(user){
          if(user.balance>amount){
          user.balance-=amount;
      
          user.transaction.push(
            {
              Type:'Debit',
              Amount:amount
            })
            user.save();
          return {
            status:'True',
            statusCode:200,
            message:`${amount} is debited and balance is ${user.balance}`
          }
        }

        }else{
          // alert('Tranasaction Failed')
          return {
            status:'false',
            statusCode:400,
            message:'Tranasaction failed'
          }
        }
      })
    }




 const getTranasaction=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
        return {
          status:'True',
          statusCode:200,
          transaction:user.transaction
        }
        
      }else{
      return{
        status:'false',
        statusCode:400,
        message:'user not found'
      }
    }
    })
  }



const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if(user){
        return {
          status:'True',
          statusCode:200,
          message:'user deleted Successfully'
        }
        
      }else{
      return{
        status:'false',
        statusCode:400,
        message:'user not found'
      }
    }
    })
}





  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTranasaction,
    deleteAcc
  }
