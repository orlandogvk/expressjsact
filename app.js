const fs=require('fs')
const express=require('express')
const morgan=require('morgan')
const app=express()

//Setings
app.set('port',3000)  //Config server port
app.set('appName','App con express JS Academlo')

//Midleware
app.use(morgan(`dev`)) //formato de peticion


//Midlewares get
app.get('/',(req,res)=>{
        res.sendFile(__dirname + '/assets/index.html');
})

app.get('/inicio',(req,res)=>{
    // res.sendFile('C:\\Users\\Usuario\\Desktop\\filesExpress\\assets'+'/login.html')
        res.sendFile(__dirname + '/assets/login.html');
})

app.get('/nosotros',(req,res)=>{  
    fs.readFile('contador.txt',(error,data)=>{
        if(error){
            console.log(error)
        }
        let visitas=data.toString().split(':')[1];
        visitas++;
    
        fs.writeFile('contador.txt',`visitas:${visitas}`,(error,data)=>{
            if(error){
                console.log(error)
            }
        })
        res.send(`<h1 style="font-family:verdana;color:red;text-align:center;margin-top:25%">Visitas:${visitas}</h1>`)
    })
})

app.get('/registro',(req,res)=>{
    res.sendFile(__dirname + '/assets/register.html');
})
app.get('/restablecer-contrasena',(req,res)=>{
    res.sendFile(__dirname + '/assets/password.html');
})

app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/assets/404.html');
  });



//Listen port 

app.listen(app.get('port'), () => {
    console.log(app.get('appName'))
    console.log(`App listening at http://localhost:${app.get('port')}`) //Se muestra el protocol y el port
  })
 