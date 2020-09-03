const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const app = express()

//Setings
app.set('port', 3000)  //Config server port
app.set('appName', 'App con express JS Academlo')

//Midleware
app.use(morgan(`dev`)) //formato de peticion
app.use(express.static(__dirname+'/public'))
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(express.json()); 


//Midlewares get
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})


app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
})

app.get('/nosotros', (req, res) => {
    fs.readFile('contador.txt', (error, data) => {
        if (error) {
            console.log(error)
        }
        let visitas = data.toString().split(':')[1];
        visitas++;

        fs.writeFile('contador.txt', `visitas:${visitas}`, (error, data) => {
            if (error) {
                console.log(error)
            }
        })
        res.send(`<h1 style="font-family:verdana;color:red;text-align:center;margin-top:25%">Visitas:${visitas}</h1>`)
    })
})

app.post('/register', (req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    fs.readFile('db.json', (error, data) => {
        let users = JSON.parse(data.toString());
        users.push(req.body)

        fs.writeFile('db.json', JSON.stringify(users), (error) => {
            if (error) {
                console.log(error)
            }
        })
        res.redirect('/')
    })

})

app.post('/login', (req, res) => {
    let correo = req.body.email;
    let clave = req.body.password;
    fs.readFile('db.json', (error, data) => {
        let users = JSON.parse(data.toString());
        console.log('USUSARIOS', users)
        let usr = users.find((user) => user.email === correo)
        console.log('USUARIO SELECCIONADO', usr)
        if (usr) {
            let pwd = usr.password.find((pass) => pass === clave)
            console.log('CLAVE DE USUARIO', pwd)
            if (pwd) {
                res.redirect('/dashboard')
                console.log('Datos correctos')
            } else {
                res.redirect('/')
            }
        }else{
            // res.send('Usuario no existe')
            res.redirect('/')
        }

    })
})


app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})



app.get('/restablecer-contrasena', (req, res) => {
    res.sendFile(__dirname + '/public/forgot-password.html');
})

app.get('*', function (req, res) {
    res.status(404).sendFile(__dirname + '/public/404.html');
});



//Listen port 

app.listen(app.get('port'), () => {
    console.log(app.get('appName'))
    console.log(`App listening at http://localhost:${app.get('port')}`) //Se muestra el protocol y el port
})
