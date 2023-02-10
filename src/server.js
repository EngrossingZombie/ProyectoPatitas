const express = require('express');
const app = express();

const { format } = require('timeago.js');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const uuid = require('uuid-v4');

// const Image = require('./app/models/Image.js');
const { url } = require('./config/database.js');
const user = require('./app/models/user.js');

// multer.diskStorage({
// 	filename: (req, file, cb) => {
// 		cb(null, file.originalname);
// 	}
// })

// configuraciones de conexión
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// const storage = multer.diskStorage({
//     // Ruta de almacén de imágenes  
//     destination: './src/public/uploads',
//       filename: (req, file, cb, filename) => {
//           cb(null, uuid() + path.extname(file.originalname));
//     }
// });


// app.use(multer({storage}).any('image' || 'profileImg'));


// let upload = multer({ storage: storage });
// let multipleUpload = upload.fields([{ name: 'foto1' }, { name: 'foto2' }]);

// const storage2 = app.use(multer({ storage: storage }).single('profileImg'));

mongoose.connect("mongodb://127.0.0.1:27017/patitas", {
	useNewUrlParser: true, useUnifiedTopology: true
});


require('./config/passport')(passport);


// middlewares
// app.use(multer({
//     dest: path.join(__dirname, 'public/uploads'),
//     fileFilter: function (req, file, cb) {

//         var filetypes = /jpeg|jpg|png|gif/;
//         var mimetype = filetypes.test(file.mimetype);
//         var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb("Solo se soportan los siguientes formatos " + filetypes);
//         console.log('MULTER MIDDLEWARE');
//     },
//     limits: {fileSize: 2000000},
// }).single('image'));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// Variable global
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});


// necesario para passport
app.use(session({
	secret: 'Paulina Carreno',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// rutas
require('./app/routes.js')(app, passport);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Iniciar el servidor
app.listen(app.get('port'), () => {
	console.log('Servidor iniciado en el puerto >>> ', app.get('port'));
});


