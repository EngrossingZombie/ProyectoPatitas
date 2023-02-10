// const Image = require('./models/Image');
// const Image = require('./app/models/Image.js');

const Image = require('./Image.js');
const Mascota = require('./mascota.js')
const imgPerfil = require('./imgperfil.js');
const path = require('path');
const {
	unlink
} = require('fs-extra');
const User = require('./models/user.js');
const Mascotas = require('./mascota.js');
const Post = require('./post.js');
const Found = require('./encontrada.js');
const Institucion = require('./models/Insti');
const Hogar = require('./models/Hogar');



const {upload} = require('../config/multer.js');

module.exports = (app, passport) => {

	app.post("/subirmascota", async (req, res) => {
		const img = new imgPerfil();
		img.user = User._id;
		img.title = req.body.title;
		img.description = req.body.description;
		img.filename = req.file.filename;
		img.path = '/uploads/' + req.file.filename;
		img.originalname = req.file.originalname;
		img.mimetype = req.file.mimetype;
		img.size = req.file.size;
		var nombreimagen = img.filename;
		await img.save();
		var foto = {}
		foto[nombreimagen];
		console.log(User._id, foto)
		User.findOneAndUpdate({
			_id: User._id
		}, {
			foto
		});
		console.log(img.path, '<<< IMAGE PATH')
		res.redirect('/');
	});




	app.post('/reportar', upload.array('image'), async (req, res) => {
		try {
			let filesArray = [];
			req.files.forEach(element => {
				const file = {
					userid: req.user._id,
					fileName: element.originalname,
					filePath: element.path,
					fileType: element.mimetype,
					path: '/uploads/' + element.filename
				}
				filesArray.push(file);
			});
			const fotos = new Post({
				username: req.user.local.name,
				recompensa: req.body.recompensa,
				comuna: req.body.comuna,
				descripcion: req.body.description,
				userid: req.user._id,
				title: req.body.title,
				fotos: filesArray
			});


			await fotos.save();
			console.log('Files Uploaded Successfully');
			res.redirect('/');
		} catch (error) {
			res.redirect('reportar');
			console.log(error);
		}

	});

	app.post('/ofrecerhogartemporal/:id', async (req, res) => {
		try {
			console.log(req.params['id']);
			userID = req.params['id'];
			usuario = await Post.findById(userID);
			// userFromPost = usuario.userid;
			// console.log(userFromPost, 'USER DUEÑO  DEL POST')
			console.log(usuario);
			const destinatario = usuario.userid;
			// nombreUsuario = usuario.name;
			const hogar = new Hogar({
				username: req.user.local.name,
				region: req.body.region,
				comuna: req.body.comuna,
				fono: req.body.fono,
				userid: req.user._id,
				indicaciones: req.body.indicaciones,
				destinatario: destinatario
			});

			await hogar.save();
			console.log('Files Uploaded Successfully');
			res.redirect('/');
		} catch (error) {
			res.redirect('/profile');
			console.log(error);
		}

	});

	app.post('/crearinstitucion', upload.array('image'), async (req, res) => {
		try {
			let filesArray = [];
			req.files.forEach(element => {
				const file = {
					userid: req.user._id,
					fileName: element.originalname,
					filePath: element.path,
					fileType: element.mimetype,
					path: '/uploads/' + element.filename
				}
				filesArray.push(file);
			});
			const i = new Institucion({
				username: req.user.local.name,
				nombre: req.body.title,
				comuna: req.body.comuna,
				userid: req.user._id,
				rut: req.body.rut,
				email: req.body.email,
				fono: req.body.fono,
				fotos: filesArray
			});


			await i.save();
			console.log('Files Uploaded Successfully');
			res.redirect('/');
		} catch (error) {
			res.redirect('/profile');
			console.log(error);
		}

	});

	app.post('/encontrada', upload.array('image'), async (req, res) => {
		try {
			let filesArray = [];
			req.files.forEach(element => {
				const file = {
					userid: req.user._id,
					fileName: element.originalname,
					filePath: element.path,
					fileType: element.mimetype,
					path: '/uploads/' + element.filename
				}
				filesArray.push(file);
			});
			const encontrada = new Found({
				username: req.user.local.name,
				comuna: req.body.comuna,
				descripcion: req.body.description,
				userid: req.user._id,
				fotos: filesArray
			});


			await encontrada.save();
			console.log('Fotos subidas satisfactoriamente!');
			res.redirect('/');
		} catch (error) {
			res.redirect('/encontrada');
			console.log(error);
		}

	});

	app.post('/mismascotas', upload.single('image'), async (req, res) => {
		const mascotita = new Mascota();
		mascotita.usuario = req.user._id;
		mascotita.title = req.body.title;
		mascotita.description = req.body.description;
		mascotita.filename = req.file.filename;
		mascotita.path = '/uploads/' + req.file.filename;
		mascotita.originalname = req.file.originalname;
		mascotita.mimetype = req.file.mimetype;
		mascotita.size = req.file.size;

		await mascotita.save();

		console.log(mascotita);
		console.log(mascotita.path, '<<< MASCOTITA PATH')
		console.log('>>>>>>> /REPORTAR POST <<<<<<<<')
		res.redirect('profile');
	});

	// Ruta de index y encontrados
	app.get('/', async (req, res) => {
		const images = await Image.find();
		const profimages = await imgPerfil.find();
		const posts = await Post.find();
		const encontradas = await Found.find();
		
		res.render('index', {
			encontradas,
			images,
			user: req.user,
			profimages,
			posts: posts
		});
	});

	app.get('/instituciones', async (req, res) => {
		const ins = await Institucion.find();
		console.log(req.user);
		const posts = await Post.find();
			res.render('instituciones', {
				ins,
				user: req.user,
				posts: posts
			});
	});

	app.get('/crud', async (req, res) => {

		const users = await User.find();
		console.log(req.user);
		const posts = await Post.find();
		if(req.user){
			if(req.user.local.name === 'admin'){
				res.render('users', {
					users: users,
					user: req.user,
					posts: posts
				});
			}else{
				res.render("/");
			}
		}else{
			res.redirect("/")
		}
	});

	app.get('/updateUser/:id', isLoggedIn, async (req, res) => {
		const users = await User.find();
		const id = req.params.id;
		const oneUser = await User.findById(id);
		res.render('updateuser', {
			oneUser,
			users,
			user: req.user
		});
	});

	app.post('/updateUser/:id', isLoggedIn, async (req, res) => {		
		if(req.body && req.user.local.name === 'admin'){
			const id = req.params.id;
			const data = req.body;
			console.log(id);
			await User.findByIdAndUpdate(id, {
				$set: {
				  'local.name': data.name, 
				  'local.email': data.email,
				  'local.rut': data.rut,
				  'local.region': data.region,
				  'local.comuna':data.comuna
				}
			  }, {new: true});
			console.log("Actualizado")
		res.redirect('/crud');
		}else{
			res.redirect("/");
		}
		
	});

	app.get('/donar', isLoggedIn, async (req, res) => {
		const images = await Image.find();
		const profimages = await imgPerfil.find();
		const posts = await Post.find();
		const encontradas = await Found.find();
		res.render('donar', {
			encontradas,
			images,
			user: req.user,
			profimages,
			posts
		});
	});

	app.get('/crearinstitucion', isLoggedIn, async (req, res) => {
		const images = await Image.find();
		const profimages = await imgPerfil.find();
		const posts = await Post.find();
		const encontradas = await Found.find();
		res.render('insti', {
			encontradas,
			images,
			user: req.user,
			profimages,
			posts
		});
	});

	app.get('/encontrados', async (req, res) => {
		const images = await Image.find();
		const profimages = await imgPerfil.find();
		const posts = await Post.find();
		const encontradas = await Found.find();
		res.render('encontrados', {
			encontradas,
			images,
			user: req.user,
			profimages,
			posts
		});
	});


	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.get('/signupAdmin', (req, res) => {
		res.render('signupAdmin', {
			message: req.flash('signupMessage')
		});
	});

	app.get('/adminprofile', isLoggedIn, async (req, res) => {
		const imagesperfil = await imgPerfil.find();

		res.render('adminprofile', {
			imagesperfil: imagesperfil,
			user: req.user
		});
	});

	app.post('/signupAdmin', passport.authenticate('local-signup', {
		successRedirect: '/adminprofile',
		failureRedirect: '/signup',
		failureFlash: true // permitir mensajes

	}), async (req, res) => {
		const imagen = new imgPerfil();
		imagen.usuario = req.user._id;
		imagen.title = req.body.title;
		imagen.description = req.body.description;
		imagen.filename = req.file.filename;
		imagen.path = '/uploads/' + req.file.filename;
		imagen.originalname = req.file.originalname;
		imagen.mimetype = req.file.mimetype;
		imagen.size = req.file.size;

		await imagen.save();
		// User.local.foto=imagen.path;
		// User.save();
		console.log(imagen);
		console.log('SUBIR >>>>>> POST <<<<<<<<')
		res.redirect('profile')
	});

	// app.post('/signup', );

	app.post('/signup', upload.single('image'), passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages

	}), async (req, res) => {
		const imagen = new imgPerfil();
		imagen.usuario = req.user._id;
		imagen.title = req.body.title;
		imagen.description = req.body.description;
		imagen.filename = req.files.filename;
		imagen.path = '/uploads/' + req.files.filename;
		imagen.originalname = req.files.originalname;
		imagen.mimetype = req.files.mimetype;
		imagen.size = req.files.size;

		await imagen.save();
		// User.local.foto=imagen.path;
		// User.save();
		console.log(imagen);
		console.log('SUBIR >>>>>> POST <<<<<<<<')
		res.redirect('profile')
	});

	//profile view
	app.get('/profile', isLoggedIn, async (req, res) => {
		const imagesperfil = await imgPerfil.find();
		const images = await Image.find();
		const mascotas = await Mascotas.find();
		const hogares = await Hogar.find();

		res.render('profile', {
			hogares,
			mascotas,
			imagesperfil: imagesperfil,
			images: images,
			user: req.user
		});
	});

	app.get('/encontrada', isLoggedIn, (req, res) => {
		// res.render('reportar', {
		// 	user: req.user
		// });
		res.render('encontrada');
	});

	app.get('/reportar', isLoggedIn, (req, res) => {
		// res.render('reportar', {
		// 	user: req.user
		// });
		res.render('reportar');
	});

	app.get('/mismascotas', isLoggedIn, (req, res) => {
		// res.render('reportar', {
		// 	user: req.user
		// });
		res.render('mismascotas');
	});


	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});


	app.get('/institucion/:id', async (req, res) => {
		const {
			id
		} = req.params;
		const i = await Institucion.findById(id);
		const user = req.user;
		res.render('instiprof', {
			i,
			user
		});
	});

	app.get('/ofrecerhogar/:id', async (req, res) => {
		const {
			id
		} = req.params;
		const i = await Institucion.findById(id);
		const user = req.user;
		res.render('ofrecerhogar', {
			id,
			i,
			user
		});
	});

	// GET a imagenes
	app.get('/encontrada/:id', async (req, res) => {
		const {
			id
		} = req.params;
		const mascotas = await Found.findById(id);
		const user = req.user;
		res.render('perdidaProf', {
			mascotas,
			user
		});
	});

	app.get('/mascota/:id', async (req, res) => {
		const {
			id
		} = req.params;
		const mascotas = await Mascota.findById(id);
		const user = req.user;
		res.render('mascotitaprof', {
			mascotas,
			user
		});
	});

	app.get('/deleteUser/:id', isLoggedIn, async (req, res) => {
		try {
			const id = req.params.id;
			const oneUser = await User.findByIdAndRemove(id);
			if(!oneUser) return res.status(404).send('No se ha encontrado el usuario');
			   
		} catch (error) {
			res.status(400).send(error.message);
		}
		res.redirect('/');     
	});


	// const getUpdateCustomerView = async (req, res, next) => {
	// 	try {
	// 		const id = req.params.id;
	// 		const onecustomer = await Customer.findById(id).exec();
	// 		res.render('updateCustomer', {
	// 			customer: onecustomer
	// 		});
	// 	} catch (error) {
	// 		res.status(400).send(error.message);
	// 	}
	// }

	app.get('/encontrada/:id/delete', async (req, res) => {
		const {
			id
		} = req.params;
		const imageDeleted = await Found.findByIdAndRemove(id);
		await unlink(path.resolve('./src/public' + imageDeleted.fotos[0].path));
		res.redirect('/');
	});

	app.get('/institucion/:id/delete', async (req, res) => {
		const {
			id
		} = req.params;
		const imageDeleted = await Institucion.findByIdAndRemove(id);
		await unlink(path.resolve('./src/public' + imageDeleted.fotos[0].path));
		res.redirect('/');
	});

	app.get('/mascota/:id/delete', async (req, res) => {
		const {
			id
		} = req.params;
		const imageDeleted = await Mascota.findByIdAndRemove(id);
		await unlink(path.resolve('./src/public' + imageDeleted.path));
		res.redirect('/profile');
	});

	app.get('/image/:id', async (req, res) => {
		const {
			id
		} = req.params;
		const post = await Post.findById(id);
		const user = req.user;
		res.render('imgprofile', {
			post,
			user
		});
	});


	app.get('/image/:id/delete', async (req, res) => {
		const {
			id
		} = req.params;
		const imageDeleted = await Post.findByIdAndRemove(id);
		await unlink(path.resolve('./src/public' + imageDeleted.fotos[0].path));
		res.redirect('/');
	});



};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}