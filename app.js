const express = require('express');
const fs = require('fs')
const pg = require('pg')
const bodyParser = require('body-parser')
const app = express();
const connectString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';


//json, host
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/static', express.static("static"))

//postgress
// pg.connect(connectString, function (err, client, done) {
// 		if (err){ 
// 			throw err;
// 		}
// 		client.query(`insert into messages 
//         (title, body) 
//         values 
//         ('${messageTitle}', '${messageBody}')`, function(err, result){
// 			console.log(result)

// 			done();
// 			pg.end();
// 	});
// });




//first page
app.get('/message', (req, res) => {
	res.render ('message')
});

app.post('/message', (req, res) => {
	
	var allMessages = {
			title: req.body.title,
			text: req.body.text
		}
	console.log(allMessages)
	pg.connect(connectString, function (err, client, done) {
		if (err){ 
			throw err;
		}
		client.query(`insert into messages 
        (title, text) 
        values 
        (${allMessages.title}, ${allMessages.text})`, function(err, result){
			console.log(result)

		
			done();
			pg.end();
		});//function(err,result)
	});//connectString

		res.render('message_board', {allMessages: allMessages})
});//post


//second page
app.get('/message_board', function (req, res) {
	pg.connect(connectString, function(err, client, done){
		client.query('select * from messages', function(err, result) {

			if (err) {
				throw err
			};
			console.log(result.rows)
			allMessages = result.rows;

			allMessages = allMessages.reverse(); //wat doet deze?
			console.log(allMessages + '2')

			res.render('message_board', {
				allMessages: allMessages
			});
			done();
			pg.end();
		});	
	});
});


app.listen(3000, ()=> {
	console.log("Ready, set, GO!")
});

