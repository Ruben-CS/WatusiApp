const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const bodyParser = require("body-parser");
let indexRoute = require('./routes/indexRoute');
let catalogoRoute = require('./routes/catalogoRoute');
let signInRoute = require('./routes/signInRoute');
let registerRoute = require('./routes/registerRoute');
let administrarRoute = require('./routes/administrarRoute');
app.disable('etag');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));

app.use('/', indexRoute);
app.use('/catalogo', catalogoRoute);
app.use('/signIn', signInRoute);
app.use('/register/', registerRoute);
app.use('/administrar/', administrarRoute);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/dist/index.html"));
});
app.get("/catalogo", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/Views/catalogo.html"));
});
app.get("/signin", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/Views/signin.html"));
});
app.get("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/Views/register.html"));
});
app.get("/administrar", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/Views/administrar.html"));
});

/*
app.get("/obtenerTipos",);

app.post("/guardarTipo",);

app.post("/eliminarTipo",);
*/
// Fin llamadas Tipo

// Llamadas para la tabla producto

// app.get("/obtenerProductos", (req, res) => {
// 	db.any(
// 		"SELECT p.*, t.nombre tipo FROM producto p, tipo t WHERE p.idtipo=t.idtipo ORDER BY 1",
// 	)
// 		.then(function (productos) {
// 			db.any("SELECT * FROM tipo ORDER BY 1")
// 				.then((tipos) => {
// 					res.type("json");
// 					res.json({
// 						Success: true,
// 						Data: { Productos: productos, Tipos: tipos },
// 					});
// 				})
// 				.catch((error) => {
// 					res.type("json");
// 					res.send({ Success: false, Mensaje: error.message });
// 				});
// 		})
// 		.catch((error) => {
// 			res.type("json");
// 			res.send({ Success: false, Mensaje: error.message });
// 		});
// });
//
// app.post("/GuardarProducto", (req, res) => {
// 	const data = {
// 		idproducto: req.body.idproducto,
// 		nombre: req.body.nombre,
// 		descripcion: req.body.descripcion,
// 		precio: req.body.precio,
// 		cantidad: req.body.cantidad,
// 		idtipo: req.body.idtipo,
// 	};
// 	if (data.idproducto == 0) {
// 		let sql =
// 			"INSERT INTO Producto (Nombre, Descripcion, Precio, Cantidad, idTipo) VALUES ($1,$2,$3,$4,$5) RETURNING idProducto";
// 		let params = [
// 			data.nombre,
// 			data.descripcion,
// 			data.precio,
// 			data.cantidad,
// 			data.idtipo,
// 		];
// 		db.one(sql, params)
// 			.then((data) => {
// 				res.type("json");
// 				res.send({ Success: true, Data: data.idproducto });
// 			})
// 			.catch((error) => {
// 				res.type("json");
// 				res.send({ Success: false, Mensaje: error.message });
// 			});
// 	} else {
// 		let sql =
// 			"UPDATE Producto SET Nombre=$1, Descripcion=$2, Precio=$3, Cantidad=$4, idTipo=$5 WHERE IdProducto=$6";
// 		let params = [
// 			data.nombre,
// 			data.descripcion,
// 			data.precio,
// 			data.cantidad,
// 			data.idtipo,
// 			data.idproducto,
// 		];
// 		db.none(sql, params)
// 			.then(() => {
// 				res.type("json");
// 				res.send({ Success: true });
// 			})
// 			.catch((error) => {
// 				res.type("json");
// 				res.send({ Success: false, Mensaje: error.message });
// 			});
// 	}
// });
//
// app.post("/EliminarProducto", (req, res) => {
// 	var data = { idproducto: req.body.idproducto };
// 	var sql = "DELETE FROM Producto WHERE idProducto=$1";
// 	var params = [data.idproducto];
// 	db.none(sql, params)
// 		.then(() => {
// 			res.type("json");
// 			res.send({ Success: true });
// 		})
// 		.catch((error) => {
// 			res.type("json");
// 			res.send({ Success: false, Mensaje: error.message });
// 		});
// });
//
// // Fin de llamadas pra producto
//
app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);
});
