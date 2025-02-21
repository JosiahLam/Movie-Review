import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {
	
		let connection = mysql.createConnection(config);
	
		let sql = `SELECT id, name, year, quality FROM movies`;
	
		console.log(sql);
	
		connection.query(sql, (error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}
	
			console.log(results);
			let string = JSON.stringify(results);
			res.send({ express: string });
		});

		connection.end();
	});

app.post('/api/addReview', (req, res) => {

	const connection = mysql.createConnection(config)

	const {userID, movieID, reviewTitle, reviewContent, reviewScore} = req.body;

	console.log("userID: " + userID, 
				"movieID " + movieID ,
				"reviewTitle " + reviewTitle, 
				"reviewContent " + reviewContent,
				"reviewScore " + reviewScore)

	let sql = `INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`; 
	console.log(sql)
	let data = [userID, movieID, reviewTitle, reviewContent, reviewScore]
	console.log(data)

	connection.query(sql, data, (error, results) => {
		if (error) {
			return console.error(error.message); 
		}
		res.send({ results: "Review added successfully" });
	})
	connection.end()
})

app.post('/api/search', (req, res) => {

    let connection = mysql.createConnection(config)
    
    const {titleSearchTerm, actorSearchTerm, directorSearchTerm} = req.body;

    console.log("enteredTitle: ", titleSearchTerm)
    console.log("enteredActor: ", actorSearchTerm)
    console.log("enteredDirector: ", directorSearchTerm)

    let sql = `
        SELECT 
            m.name, 
            GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name)) AS directors,
            IFNULL(AVG(r.reviewScore), 'N/A') AS averageRating,
            GROUP_CONCAT(DISTINCT r.reviewContent SEPARATOR '\n') AS reviews
		
        FROM movies m
        JOIN movies_directors md ON m.id = md.movie_id
        JOIN directors d ON md.director_id = d.id
        LEFT JOIN Review r ON m.id = r.movieID
        WHERE 1=1
    `;

    let data = [];

    // Add conditions based on the user input
    if (titleSearchTerm) {
        sql += ` AND m.name LIKE ?`;
        data.push(titleSearchTerm);
    }
    if (actorSearchTerm) {
        sql += ` AND m.id IN (SELECT roles.movie_id
					FROM roles
					JOIN actor a ON actor_id = a.id
					WHERE CONCAT(a.first_name, ' ', a.last_name) LIKE ?)`;
        data.push(`%${actorSearchTerm}%`);
    }
    if (directorSearchTerm) {
        sql += ` AND CONCAT(d.first_name, ' ', d.last_name) LIKE ?`;
        data.push(`%${directorSearchTerm}%`);
    }

    // Group by movie to get the correct aggregations
    sql += ` GROUP BY m.name;`

    console.log(sql);
    console.log(data);

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }

		console.log("results", results);
        res.send({ express: JSON.stringify(results) });
    });
    connection.end();
});


app.post('/api/getMyPageDetails', (req, res) => {
	
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM MyPage`;

	console.log(sql);

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log(results);
		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end();
});




app.post("/api/addTrailerReview", (req, res) => {

	const connection = mysql.createConnection(config)

	const {trailerID, userID, trailerScore} = req.body;

	console.log("trailerID: " + trailerID, 
				"userID " + userID ,
				"trailerScore " + trailerScore)

	let sql = `INSERT INTO Trailers (trailerID, userID, trailerScore) VALUES (?, ?, ?)`; 
	console.log(sql)
	let data = [trailerID, userID, trailerScore]
	console.log(data)

	connection.query(sql, data, (error, results) => {
		if (error) {
			return console.error(error.message); 
		}
		res.send({ results: "Trailer Review added successfully" });
	})
	connection.end()
})

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server