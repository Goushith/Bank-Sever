//server creation

// import express 
const express = require ('express')


//import dataservices
    const dataService =require ('./services/data.service')

    //import port
    const cors =require('cors')

//create an application using express
const app=express()


//to parse json from req body
app.use(express.json())



    //give command to share data via cors 
    app.use(cors({
        origin:['http://localhost:4200','http://192.168.0.145:8080']
    }))

// importing json web token

const jwt = require('jsonwebtoken')

//create a port number 

app.listen(3000,()=>{
    console.log('listrning to port 3000');
})

// Application Specific Middleware
    const appMiddleWare = (req,res,next)=>{
        console.log('Application Specific Middleware ');
        next();
    }

    app.use(appMiddleWare)


    // Router specific Middleware
    const jwtMiddleWare=(req,res,next)=>{
        try{
            console.log("Router specific Middleware");
            const token=req.headers['x-access-token'];
            const data =jwt.verify(token,'superkey2002');
            console.log(data);
            next()


        }
        catch{
            res.status(422).json({
                statusCode:"422",
                status:"false",
                message:"please login first"


            })
            

        }
    
    }

// ----------------------API request ------------------------------------------

// reqgistration request

app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })//access
   

})


// login request
app.post('/login',  (req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})



//deposit request
app.post('/deposit',jwtMiddleWare,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})




//withdraw request
app.post('/withdraw',jwtMiddleWare,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})



//transaction request
app.post('/transaction',jwtMiddleWare,(req,res)=>{
    console.log(req.body);
    dataService.getTranasaction(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
// delete request

app.delete('/deleteAcc/:acno',(req,res)=>{
    // console.log(req.body);
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})