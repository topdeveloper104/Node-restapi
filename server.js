const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// app.get('*', function(req, res) {
//     res.sendfile('./public/views/index.html');
// });

const api = require('./server/routes/api');

app.use('/api', api);

const port = process.env.PORT || 8081;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => { console.log('API running on port: ' + port); });