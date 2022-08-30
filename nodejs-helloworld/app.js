var express = require('express');
app = express();

const mongo = require('mongodb').MongoClient;

const mongoUri = process.env.uri;
const mongoUsername = process.env.username || process.env.MONGODB_USER;
const mongoPassword = process.env.password || process.env.MONGODB_PASSWORD;
const dbName = process.env.database_name || 
			   process.env.MONGODB_DBNAME || 
			   process.env.MONGODB_DATABASE ||
			   'sampledb';
const dbServiceName = process.env.DATABASE_SERVICE_NAME || 'localhost';

var dbConnectionUrl;

// If the monogo secret has been attached, modify the provided URI to include
// authentication credentials
if (mongoUri) {
	var auth = mongoUsername + ':' + mongoPassword + '@'
	var pieces = mongoUri.split('//');
	dbConnectionUrl = pieces[0] + '//' + auth + pieces[1] + '/' + dbName;
}
else if (process.env.MONGODB_URL){
	dbConnectionUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/sampledb';
} else {
	dbConnectionUrl = 'mongodb://' + mongoUsername + ':' + 
					mongoPassword + '@' + 
					dbServiceName + ':27017/' 
					+ dbName;
}

console.log('Mongo url:', dbConnectionUrl);

app.get('/', function (req, res) {
  res.send('Last Day DO180');
});

app.get('/debug', function(req, res, next) {

	var details = {
		"mongo_url": dbConnectionUrl,
		"connected": false
	};

	mongo.connect(dbConnectionUrl, (err, client) => {
		if (err) {
			console.error(err);
			res.send(err);
		} else {
			console.log('Connected to Mongo')
			details["connected"] = true;
			console.log("Updated details")
		}
		res.send(details);
	});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

