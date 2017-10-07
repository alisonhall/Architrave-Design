var express = require('express');
var app = express();
var path = require('path');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var randomID = require("random-id");
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data
//Handle our Requests


// View home page and data
app.get('/', function (req, res) {
	fs.readFile(__dirname + "/data/list.json", 'utf8', function (err, data) {
		console.log(data);
		res.render('index', {
			list: data
		});
	});
});

// // Add item
// app.post('/', function (req, res) {
// 	req.body.id = randomID(10);
// 	req.body.complete = false;
// 	req.body.editing = false;
// 	req.body.deleting = false;
// 	console.log(req.body.id);
// 	console.log(req.body);
// 	fs.readFile(__dirname + "/data/list.json", 'utf8', function (err, data) {
// 		data = JSON.parse(data);
// 		data.push(req.body);
// 		data = JSON.stringify(data);
// 		fs.writeFile(__dirname + "/data/list.json", data, function (err) {
// 			if (err) {
// 				console.log(err.message);
// 				return;
// 			}
// 			res.render('index', {
// 				list: data,
// 				success: "Your Task Was Added to the List"
// 			});
// 			console.log("The file was saved!");
// 		});
// 	});
// });

// // Edit item
// app.post('/:id', function (req, res) {
// 	var taskId = req.params.id;
// 	console.log(taskId);
// 	console.log(req.body);
// 	var editType;
// 	fs.readFile(__dirname + "/data/list.json", 'utf8', function (err, data) {
// 		list = JSON.parse(data);
// 		// iterate over each element in the array
// 		for (var i = 0; i < list.length; i++) {
// 			// look for the entry with a matching 'id' value
// 			if (list[i].id == taskId) {
// 				if (req.body.editing == 'checkbox') {
// 					editType = 'toggleCheck';
// 					if(req.body.complete == 'on' || req.body.complete == true) {
// 						list[i].complete = true;
// 					} else {
// 						list[i].complete = false;
// 					}
// 				} else if (req.body.editing == 'save') {
// 					editType = 'saveEdit';
// 					list[i].name = req.body.name;
// 					list[i].deleting = false;
// 				} else {
// 					editType = 'cancelEdit';
// 					list[i].deleting = false;
// 				}
// 			}
// 		}
// 		console.log(list);
// 		list = JSON.stringify(list);
// 		fs.writeFile(__dirname + "/data/list.json", list, function (err) {
// 			if (err) {
// 				console.log(err.message);
// 				return;
// 			}
// 			if (editType == 'cancelEdit') {
// 				res.render('index', {
// 					list: list
// 				});
// 			} else {
// 				res.render('index', {
// 					list: list,
// 					edited: "Your Task Was Edited"
// 				});
// 			}
			
// 			console.log("The file was saved!");
// 		});

// 	});
// });

// // Delete item
// app.delete('/:id', function (req, res) {
// 	var taskId = req.params.id;
// 	console.log(taskId);
// 	console.log(req.body);
// 	var deleteType = req.body.deleteType;
// 	fs.readFile(__dirname + "/data/list.json", 'utf8', function (err, data) {
// 		list = JSON.parse(data);
// 		// iterate over each element in the array
// 		for (var i = 0; i < list.length; i++) {
// 			// look for the entry with a matching 'id' value
// 			if (list[i].id == taskId) {
// 				if (deleteType == 'confirm') {
// 					list[i].deleting = true;
// 				} else if (deleteType == 'delete') {
// 					list.splice(i, 1);
// 				} else {
// 					list[i].deleting = false;
// 				}
// 			}
// 		}
// 		console.log(list);
// 		list = JSON.stringify(list);
// 		fs.writeFile(__dirname + "/data/list.json", list, function (err) {
// 			if (err) {
// 				console.log(err.message);
// 				return;
// 			}
// 			if(deleteType == 'delete') {
// 				res.render('index', {
// 					list: list,
// 					deleted: "Your Task Was Deleted From the List"
// 				});
// 			} else {
// 				res.render('index', {
// 					list: list
// 				});
// 			}
			
// 			console.log("The file was saved!");
// 		});

// 	});
// });



//To start running the server, in the Terminal, navigate to the project folder and run: node app.js

//Start our server
app.listen(3000, function () {
	console.log('App listening on port 3000!')
})