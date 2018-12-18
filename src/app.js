console.log("Initializing feedback API...");

const express = require('express'),
	bodyParser = require('body-parser'),
	helmet = require('helmet'),
	routes = require('./routes/routes'),
	response = require('./models/response'),
	cors = require('cors');
 	sql = require('mssql/msnodesqlv8');


const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
routes(app);

const pool = new sql.ConnectionPool({
  database: 'RoutePlanner2_DEV',
  server: 'RoutePlanner2_DEV',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
});

pool.connect().then(() => {
  //simple query
  pool.request().query('select 1 as number', (err, result) => {
        console.dir(result)
    })
});

app.use(function (err, req, res, next) {
	res.status(500);
	res.send(response(500, err ? err.message : 'Unexpected error occurred in API'));
});

app.get('/', function (req, res) {
	res.type('json')
	.send(response(200, 'API health check'));
});

app.listen(port, function () {
	console.log('API running on port ' + port);
});
