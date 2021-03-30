//import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const formidable = require('formidable');
const fs = require("fs");
const path = require('path')
let userRouter = require('./modules/users/user_route');
let projectRouter = require('./modules/project/project_route')
let testRouter = require('./modules/test/test_router')
let {errHandler} = require('./commons/middleware/error_handler')
let methodOverride = require('method-override')
const admin = require("firebase-admin");

//define variable
const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride())

//define response
app.get('/', (req, res, next) => {
    next(new Error("error"))
})

app.post('/', (req, res,next) => {
    res.send('get post request')
});

app.put('/user', (req, res,next) => {
    res.send('get put request from /user')
});

app.delete('/user', (req, res, next) => {
    res.send('get delete request from /user')
});

//router parameter: value is defined in value
app.get('/users/:userId/books/:bookId', (req, res) => {
    //let userId = req.params['userId']
    let userId = req.params.userId;
    let bookId = req.params['bookId'];
    res.send("userId: " + userId + "-- bookId: " + bookId);
});

//value defines in query parameter
app.get('/users', (req, res, next) => {
    let query = req.query
    let filterQuery = query.filter
    let value = query.key
    let colors = query.color
    //res.send('filter: ' + filterQuery + ' -- value: ' + value);
    res.send("color[0] " + colors[0] + " color[1]: " + colors[1])
})

//get data from-data from POST method
app.post('/user/create', (req, res, next) => {
   //let username = req.body.username
   //let password = req.body.password
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            return;
        }
        res.send(fields)
    })
   //res.send("username: " + username + " password: " + password)
});

//create book with data from x-www-urlencoded
app.post('/books', (req, res,next) => {
    let title = req.body.title
    let description = req.body.description
    res.send("title: " + title + "-- description: " + description)
});

//get data from post json
app.post('/section', (req, res, next) => {
    let data = req.body
    res.send(data)
})

//response json data
app.get('/books',(req, res,next) => {
    const result = {name: "hnam", description: "description"};
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
})

//upload file and save & get extension
app.post('/upload', (req, res,next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        console.log("$fields.name: " + fields.name)
        let oldPath = files.profilePic.path;
        let newPath = path.join(__dirname, 'uploads')
            + '/'+fields.name + ".png"
        let rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
            return res.send("Successfully uploaded")
        })
    })
})


app.use('/files', express.static('public'))
app.use('/user', userRouter)
app.use('/project', projectRouter)
app.use('/test', testRouter)

// app.use((req, res,next, err) => {
//     // Do logging and user-friendly error message display
//     console.error(err);
//     res.status(500).send({error: err.message});
// });
app.use((err, req, res,next) => {
    // Do logging and user-friendly error message display
    console.error(err);
    res.status(500).send({error: err.message});
});


//start server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


const serviceAccount = require("../keys/adminserver-48ef8-firebase-adminsdk-a0mgh-857a139d49.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://adminserver-48ef8.firebaseio.com"
});
const db = admin.firestore();

async function setData(){
    const aTuringRef = db.collection('users').doc('aturing');
    let result = await aTuringRef.set({
        'first': 'Nam',
        'middle': 'Hoang',
        'last': 'Pham',
        'born': 1990
    });
    console.log(result)
}

async function readData(){
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data().born);
    })
}

//setData();
readData();

