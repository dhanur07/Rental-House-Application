let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), // created model loading here
    bodyParser = require('body-parser');
    multer = require('multer');
    mongoose.set('useCreateIndex', true);
// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/wedesign', {});

mongoose.Promise = global.Promise;

// adding body parser for handling request and response objects
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// enabling  CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const initApp = require('./app');
initApp(app);

app.listen(port);
console.log('Stickies RESTful API server started on: ' + port);

const DIR = './uploads';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
let upload = multer({storage: storage});


app.get('/post', function (req, res) {
    res.end('file catcher example');
});

app.post('/post/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received: ');
        return res.send({
            success: true
        })
    }
});

